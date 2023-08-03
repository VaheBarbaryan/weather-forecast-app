import { defineStore } from "pinia"
import axios from "axios"
import { formatDailyForecast, formatHourlyForecast } from "../composables/useWeatherData"

const api_key = import.meta.env.VITE_APP_API_KEY
const weather_url = import.meta.env.VITE_APP_WEATHER_URL
const forecast_url = import.meta.env.VITE_APP_FORECAST_URL
const units = 'metric'
const cnt = '5'

async function fetchData(city) {
    try {
      const { data } = await axios.get(`${weather_url}?appid=${api_key}&q=${city}&cnt=${cnt}&units=${units}`);
      const forecast = await axios.get(`${forecast_url}?appid=${api_key}&q=${data.name}&units=${units}`);
      data.dailyForecast = formatDailyForecast(forecast.data.list);
      data.hourlyForecast = formatHourlyForecast(forecast.data.list);
      return data;
    } catch (error) {
      console.error("error", error);
      return null;
    }
  }

export const useWeatherStore = defineStore('weatherStore', {
    state: () => ({
        w_cities: localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [],
    }),
    getters: {
        cities: (state) => state.w_cities,
    },
    actions: {
        async addCity(city) {
            if(this.w_cities.some(item => item.name.toLowerCase().trim() === city.toLowerCase().trim())) {
                return false
            }
            const data = await fetchData(city);
            if (data) {
                this.w_cities.unshift(data);
                localStorage.setItem('cities', JSON.stringify(this.w_cities));
            }
        },
        updateCities() {
            this.w_cities.forEach(async (city) => {
                const data = await fetchData(city.name);
                if (data) {
                    const cityIndex = this.w_cities.findIndex(s => s.id === city.id);
                    this.w_cities[cityIndex] = data;
                    localStorage.setItem('cities', JSON.stringify(this.w_cities));
                }
            })
        },
        async updateCity(city) {
            const data = await fetchData(city.name);
            if (data) {
                const cityIndex = this.w_cities.findIndex(s => s.id === city.id);
                this.w_cities[cityIndex] = data;
                localStorage.setItem('cities', JSON.stringify(this.w_cities));
            }
        },
        deleteCity(id) {
            const cityIndex = this.w_cities.findIndex(city => city.id === id)
            if(cityIndex >= 0) {
                this.w_cities.splice(cityIndex, 1)
                localStorage.setItem('cities', JSON.stringify(this.w_cities))
            }
        }
    }
})
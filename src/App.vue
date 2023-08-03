<template>
  <div class="container">
    <Form @addCity="addCity" />
    <Cities @updateCityWeather="updateCityWeather" @openDeleteModal="toggleDeleteModal" />
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import Form from './components/Form.vue'
import Cities from './components/Cities.vue'
import { useWeatherStore } from './stores/WeatherStore'

const weatherStore = useWeatherStore()
let updateCities

onMounted(() => {
  clearInterval(updateCities)
  updateCities = setInterval(() => {
    weatherStore.updateCities()
  }, 60000)
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    let { data } = await axios.get(url)
    weatherStore.addCity(data.address.city)
  })
})

const updateCityWeather = city => {
  weatherStore.updateCity(city)
}
</script>

<style lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.delete, .cancel {
  margin: 0 10px;;
  box-shadow: 0px 0px 8px rgba(0,0,0, .5);
  padding: 10px 13px;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color .2s ease-in-out;
}
.delete {
  background-color: #f00000;
  color: #fff
}
.cancel {
  color: #242424;
  background-color: #eee;
}
</style>

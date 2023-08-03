<template>
    <div class="block">
        <button class="city-delete" type="button" @click="openDeleteModal(city.id)"> <img src="../assets/trash.svg" alt=""></button>
        <div class="top">
            <div class="content">
                <img class="weather-icon" :src='`http://openweathermap.com/img/w/${city?.weather[0].icon}.png`' alt="">
                <div class="gradus">
                    {{ city?.main.temp }}&deg;
                </div>
                <div class="content-header">
                    <h1>{{ city?.name }}</h1>
                    <img @click="updateCityWeather(city)" class="refresh" src="../assets/refresh.svg" alt="">
                </div>
                <p>{{ city?.weather[0].main }}</p>
            </div>
            <WeatherDailyForecast :list="city.dailyForecast" />
        </div>
        <hr>
        <WeatherHourlyForecast :list="city.hourlyForecast" />
    </div>
</template>

<script setup>

import { useWeatherStore } from '../stores/WeatherStore'
import WeatherDailyForecast from './weather/WeatherDailyForecast.vue';
import WeatherHourlyForecast from './weather/WeatherHourlyForecast.vue';

const weatherStore = useWeatherStore()
const emits = defineEmits(['updateCityWeather', 'openDeleteModal'])

const props = defineProps({
    city: Object
})

const updateCityWeather = city => {
    emits('updateCityWeather', city)
}

const openDeleteModal = id => {
    emits('openDeleteModal', id)
}

</script>

<style lang="scss" scoped>
hr {
    margin: 15px 0;
}
.block {
    position: relative;
    padding: 30px 35px;
    background: #1a3488;
    color: #fff;
    opacity: .5;
    border-radius: 15px;
    box-shadow: 0px 0px 8px rgba(0,0,0, .5);
    .top {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .gradus {
        font-size: 30px;
        font-weight: 700;
    }
    .content {
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        .content-header {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .weather-icon {
            width: 50px;
            height: 50px;
            object-fit: cover;
        }
        .refresh {
            cursor: pointer;
            width: 17px;
            height: 17px;
            object-fit: cover;
        }
    }
    .city-delete {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 9px;
        color: #fff;
        background-color: #f00000;
        box-shadow: 0px 0px 8px rgba(0,0,0, .5);
        border-radius: 50%;
        cursor: pointer;
        transition: background-color .2s ease-in-out;
        &:hover {
            background-color: #b80202;
        }
    }
}
</style>
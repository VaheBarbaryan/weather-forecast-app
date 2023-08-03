<template>
  <form @submit.prevent="addCity" class="form">
    <div class="search-box">
        <div class="row">
            <input v-model="city" v-debounce:200="changeAutoComplete" class="input" type="text" placeholder="Write city name..." autocomplete="off">
            <button type="submit" class="add">Add</button>
        </div>
        <div class="result-box" v-if="autoCompleteValues && isAutoCompleteOpen">
            <ul>
                <li v-for="item in autoCompleteValues" :key="item" @click="chooseCity(item)">{{ item }}</li>
            </ul>
        </div>
    </div>
  </form>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useWeatherStore } from '../stores/WeatherStore'

const weatherStore = useWeatherStore()

const city = ref('')
const autoCompleteValues = ref([])
const isAutoCompleteOpen = ref(false)

const changeAutoComplete = () => {
    axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${city.value}&apiKey=ee522dff5776484a9ce1c446d3f1f796`).then(function (response) {
        let  res = response.data.features
        .filter(item => item.properties.hasOwnProperty('city'))
        .map(item => {
            let data = {
                city: item.properties.city,
                country: item.properties.country
            }
            return data
        })
        res = [...new Set(res.map(item => item.city))]
        autoCompleteValues.value = res
    }).catch(function (error) {
        console.error(error);
    });
    isAutoCompleteOpen.value = city.value.length > 3 ? true : false
}

const chooseCity = item => {
    city.value = item
    isAutoCompleteOpen.value = false
}

const addCity = () => {
    weatherStore.addCity(city.value)
    city.value = ''
}
</script>

<style lang="scss" scoped>
.form {
    margin-bottom: 50px;
    .search-box {
        position: relative;
        width: 500px;
    }
    .row {
        display: flex;
        align-items: center;
    }
    .result-box {
        position: absolute;
        z-index: 400;
        ul {
            border-radius: 5px;
            background: #fff;
            width: 350px;
            margin-top: 5px;
            padding: 15px 10px;
            li {
                background-color: #fff;
                border-radius: 3px;
                padding: 15px 10px;
                cursor: pointer;
                transition: background-color .1s ease-in-out;
                &:hover {
                    background: #e9f3ff;
                }
            }
        }
    } 
}

.input {
    background: #fff;
    color: #333;
    width: 350px;
    padding: 10px 13px;
    border-radius: 0px 10px 0px 10px;
    box-shadow: 0px 0px 8px rgba(0,0,0, .5);
    opacity: .5;
    margin-right: 15px;
    transition: all .2s;
    &:focus {
        box-shadow: 0px 0px 16px rgba(0,0,0, .5);
        opacity: .75;
        border-radius: 10px 0px 10px 0px;
    }
}
.add {
    color: #fff;
    background-color: #242424;
    box-shadow: 0px 0px 8px rgba(0,0,0, .5);
    padding: 10px 13px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color .2s ease-in-out;
    &:hover {
        background-color: #2e2e2e;
    }
}
</style>
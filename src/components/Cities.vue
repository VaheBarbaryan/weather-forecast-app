<template>
  <div class="blocks">
    <CityItem v-for="city in weatherStore.cities" :city="city" :key="city.name" @updateCityWeather="updateCityWeather" @openDeleteModal="openDeleteModal" />
    <Modal v-if="isDeleteModalOpen" @closeModal="toggleDeleteModal">
      <h1>Do you want to delete the city?</h1>
      <template #content>
        <button class="delete" type="button" @click="deleteModal">Delete</button>
        <button class="cancel" @click="toggleDeleteModal" type="button">Cancel</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>

import { useWeatherStore } from '../stores/WeatherStore'
import CityItem from './CityItem.vue'
import Modal from './ui/Modal.vue';
import { ref } from 'vue'

const emits = defineEmits(['updateCityWeather', 'openDeleteModal'])
const weatherStore = useWeatherStore()
const isDeleteModalOpen = ref(false)
const deleteCityId = ref(-1)

const toggleDeleteModal = () => {
  isDeleteModalOpen.value = !isDeleteModalOpen.value
}

const deleteModal = () => {
    weatherStore.deleteCity(deleteCityId.value)
    toggleDeleteModal()
}

const updateCityWeather = city => {
    emits('updateCityWeather', city)
}

const openDeleteModal = id => {
    deleteCityId.value = id
    toggleDeleteModal()
}
</script>

<style scoped>
.blocks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 20px; 
}
</style>

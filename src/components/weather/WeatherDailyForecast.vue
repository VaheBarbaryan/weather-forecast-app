<template>
  <div class="daily">
    <WeatherDailyForecast v-for="item in list" :key="item.date" :weather="item" />
  </div>
</template>

<script setup>
import WeatherDailyForecast from './WeatherDailyForecastItem.vue'

const props = defineProps({
  list: Array
})
</script>

<style lang="scss" scoped>

.daily {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

</style>
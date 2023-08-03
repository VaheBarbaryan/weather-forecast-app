<template>
    <div class="hourly">
        <WeatherHourlyForecastItemVue v-for="hour in list" :key="hour.meridiem" :hour="hour" />
    </div>
</template>

<script setup>
import WeatherHourlyForecastItemVue from "./WeatherHourlyForecastItem.vue"

const props = defineProps({
    list: {
        type: Array,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.hourly {
    display: flex;
    align-items: center;
    gap: 20px;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 2px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 7px;
    }
    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 7px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
        border-radius: 7px;
    }
}
</style>
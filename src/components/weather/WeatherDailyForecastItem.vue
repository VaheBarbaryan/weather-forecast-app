<template>
    <div class="day">
        <img :src="weather.iconUrl" alt="">
        <h3 class="day-of-week">{{ weather.date }}</h3>
        <h2 class="temp">{{ weather.temp }}&deg;</h2>
    </div>
</template>

<script setup>
const props = defineProps({
    weather: Object
})
</script>

<style lang="scss" scoped>
.day {
    text-align: center;
    .day-of-week {
        font-size: 25px;
    }
    .temp {
        margin-top: 10px;
        padding-left: 5px;
    }
}
</style>
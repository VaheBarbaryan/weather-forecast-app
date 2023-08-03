<template>
    <div class="hour">
        <h3 class="time">{{ hour.meridiem }}</h3>
        <img :src="hour.iconUrl" alt="">
        <h2 class="temp">{{ hour.temp }}&deg;</h2>
    </div>
</template>

<script setup>
const props = defineProps({
    hour: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.hour {
    text-align: center;
    .temp {
        margin-bottom: 5px;
    }
}
</style>
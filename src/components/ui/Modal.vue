<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
        <div class="modal-header">
            <slot></slot>
        </div>
        <div class="modal-content">
            <slot name="content"></slot>
        </div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['closeModal'])

const closeModal = () => {
    emits('closeModal')
}
</script>

<style scoped>
.backdrop {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal {
    background: #fff;
    border-radius: 15px;
    padding: 40px;
}
.modal-header {
    text-align: center;
}
.modal-content {
    margin-top: 15px;
    text-align: center;
}

</style>
<template>
    <div>
        <svg class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
    </div>
</template>

<script>
    export default {
        name: 'spinner-loading'
    }
</script>

<style lang="scss" scoped>
@import '@/assets/scss/spinner_loading.scss';

</style>
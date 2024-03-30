<script>
export default {
    name: 'AppListComponent',
    props: {
        title: String,
        color: String
    },
    mounted() {
        // console.log(this.color);
    }
}
</script>

<template>
    <div class="list-item" :style="{ background: 'linear-gradient(90deg, ' + color + ' 0%, #FFF 20%)' }">{{ title }}</div>
</template>

<style scoped>

</style>


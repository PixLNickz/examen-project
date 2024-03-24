<script>
export default {
    name: 'AppListComponent',
    props: {
        title: String
    }
}

</script>

<template>
    <div class="list-item">{{ title }}</div>
</template>

<style scoped>

</style>
<script>
export default {
    name: 'AppListComponent',
    props: {
        title: String,
        color: String,
        content: String,
        priority: String
    },
    data() {
        return {
            isHidden: true,
            roundedCorners: false,
        };
    },
    mounted() {
    },
    methods: {
        changeHidden() {
            this.isHidden = !this.isHidden;
            this.roundedCorners = !this.roundedCorners
        }
    }

}
</script>

<template>
    <div>
        <div class="list-item" :style="{ background: 'linear-gradient(90deg, ' + color + ' 0%, #FFF 20%)' }" @click="changeHidden()" :class="{ 'rounded': roundedCorners}">{{ title }}</div>
        <div class="additional-content" :class="{ 'hidden': isHidden }">
            <div>
                <p>Priority: {{ priority }}</p>
            </div>
            <div>
                <p>{{ content }}</p>
            </div>
        </div>
    </div>
</template>

<style>

</style>


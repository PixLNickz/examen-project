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
.list-item {
    width: 300px;
    padding: 20px;
    height: auto;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Quicksand', sans-serif;
    font-size: 24px;
    font-weight: bold;
    border-radius: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}

.additional-content {
    text-align: center;
    width: 300px;
    padding:20px;
    height: auto;
    margin: -10px 10px 10px 10px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    border-radius: 0 0 25px 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}

.additional-content p {
    padding: 10px;
}

.hidden {
    display: none;
}

.rounded {
    border-radius: 25px 25px 0 0;
}
</style>


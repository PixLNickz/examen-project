<template>
    <div class="homepage">
        <!-- Title -->
        <h1 class="title">Titel lijst</h1>

        <!-- Three rectangles items next to each other -->
        <div class="rectangle-container">
            <div class="rectangle-item">
                <span class="number">5</span>
                To-Do
                <span class="dot" style="background-color: #00A;"></span>
            </div>
            <div class="rectangle-item">
                <span class="number">5</span>
                In Progress
                <span class="dot" style="background-color: #A60;"></span>
            </div>
            <div class="rectangle-item">
                <span class="number">5</span>
                Finished
                <span class="dot" style="background-color: #0A0"></span>
            </div>
        </div>

        <!-- Bigger item below -->
        <div class="rectangle-list-container">
            <div class="list-container">
                <!-- First list -->
                <div class="rectangle-list">
                    <ListComponent />
                    <ListComponent />
                    <ListComponent />
                </div>

                <!-- Line between lists -->
                <div class="list-divider"></div>

                <!-- Second list -->
                <div class="rectangle-list">
                    <ListComponent />
                    <ListComponent />
                    <ListComponent />
                </div>

                <!-- Line between lists -->
                <div class="list-divider"></div>

                <!-- Third list -->
                <div class="rectangle-list">
                    <ListComponent />
                    <ListComponent />
                    <ListComponent />
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script setup>
import ListComponent from "@/components/AppListComponent.vue";
</script>
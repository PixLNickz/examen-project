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
                    <div class="list-item">Item 1</div>
                    <div class="list-item">Item 2</div>
                    <div class="list-item">Item 3</div>
                </div>

                <!-- Line between lists -->
                <div class="list-divider"></div>

                <!-- Second list -->
                <div class="rectangle-list">
                    <div class="list-item">Item 1</div>
                    <div class="list-item">Item 2</div>
                    <div class="list-item">Item 3</div>
                </div>

                <!-- Line between lists -->
                <div class="list-divider"></div>

                <!-- Third list -->
                <div class="rectangle-list">
                    <div class="list-item">Item 1</div>
                    <div class="list-item">Item 2</div>
                    <div class="list-item">Item 3</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.homepage {
    text-align: center;
}

.title {
    margin-top: 36px; /* Adjust as needed */
    font-family: 'Quicksand', sans-serif;
    font-size: 50px;
}

.rectangle-container {
    display: flex;
    justify-content: center;
    margin-top: 36px; /* Adjust as needed */
}

.rectangle-item {
    position: relative;
    width: calc((1120px - 20px) / 3); /* Total width divided by 3 items minus the gutter width */
    height: 69px; /* Height of smaller items */
    background-color: #fff; /* White background */
    margin: 0 5px; /* Adjust gutter width */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Quicksand', sans-serif;
    font-size: 24px;
    font-weight: bold;
    border-radius: 25px; /* Border radius */
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25); /* Drop shadow */
}
.dot {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: absolute;
    right: 22px; /* Adjust as needed */
}
.number {
    font-size: 20px;
    position: absolute;
    left: 22px;
    color: #AAA;
}

.rectangle-list-container {
    display: flex;
    justify-content: center;
    margin-top: 36px; /* Adjust as needed */
}

.list-container {
    width: 1120px;
    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-around;
    align-items: center; /* Center the divider vertically */
}

.rectangle-list {
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.list-item {
    width: calc(100% - 20px); /* Adjusted width including margin */
    height: 69px; /* Adjust as needed */
    background-color: white; /* Adjust as needed */
    margin: 10px; /* Adjust as needed */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Quicksand', sans-serif;
    font-size: 24px;
    font-weight: bold;
    border-radius: 25px; /* Adjust as needed */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25); /* Adjusted box shadow */
}

.list-divider {
    width: 1px; /* Adjust as needed */
    height: 80%; /* Adjust as needed */
    background-color: #DCDCDC;
    margin: 0; /* Adjust as needed */
}
</style>

<script setup>
</script>
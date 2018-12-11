<template>
    <div id="app">
        <h1>ITU Timepicker</h1>

        <xkolar71 v-if="showFirst" v-model="timeFirst" @submit="showFirst = !showFirst"></xkolar71>
        <div class="openContainer">
            <span>xkolar71: <strong>{{ timeFirst ? timeFirst.toLocaleTimeString() : '' }} </strong></span>
            <a @click="showFirst = true">Open</a>
        </div>
        <div class="openContainer">
            <span>xnguye16: <strong>{{ xnguye16.timeFirst ? xnguye16.timeFirst.toLocaleTimeString() : '' }} </strong></span>
            <a @click="xnguye16.showFirst = true">Open</a>
        </div>
        <xnguye16  v-if="xnguye16.showFirst" v-model="xnguye16.timeFirst" @submit="xnguye16.showFirst = !xnguye16.showFirst"/>
    </div>
</template>

<script>
    import xkolar71 from './components/xkolar71'
    import xnguye16 from './components/xnguye16'

    export default {
        components: {xkolar71, xnguye16},
        data() {
            return {
                timeFirst: null,
                showFirst: true,
                xnguye16: {
                    timeFirst: null,
                    showFirst: true,
                }
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .openContainer {
        margin-top: 30px;
    }

    a {
        background-color: dodgerblue;
        padding: .5em;
        border-radius: 5pt;
        color: white;
        cursor: pointer;
    }
</style>

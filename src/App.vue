<template>
    <div id="app">
        <h1>ITU Timepicker</h1>

        <xkolar71 v-if="displayed === 1" v-model="time" @submit="displayed = 0"></xkolar71>
        <xnguye16 v-if="displayed === 2" v-model="time" @submit="displayed = 0"/>
        <xkavan05 v-if="displayed === 3" v-model="time" @submit="displayed = 0"/>

        <br>

        <div class="time"><strong>{{ time ? time.toLocaleTimeString() : '' }} </strong></div>

        <br>

        <a @click="displayed = 1">xkolar71</a>

        <a @click="displayed = 2">xnguye16</a>

        <a @click="displayed = 3">xkavan05</a>

    </div>
</template>

<script>
    import xkolar71 from './components/xkolar71'
    import xnguye16 from './components/xnguye16'
    import xkavan05 from './components/xkavan05'

    export default {
        components: {xkolar71, xnguye16, xkavan05},
        data() {
            return {
                displayed: 0,
                time: null,
            }
        }
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    a {
        background-color: dodgerblue;
        padding: .5em;
        border-radius: 5pt;
        color: white;
        cursor: pointer;
        margin-right: 1em;
    }

    .time {
        font-weight: bold;

    }
</style>

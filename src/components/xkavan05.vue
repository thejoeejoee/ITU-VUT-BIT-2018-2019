<template>
    <div class="selector" @click="submit">
            <div class="picker" @click.stop>
                <div class="tabulka1">
                    <div class="radek" v-for="(data, index) in Array(4)" :key="index">

                        <div v-for="(data, j) in Array(6)" :key="j">
                            <div class="bunka"
                                 v-on:click="hour = index * 6 + j"
                                 v-bind:class="{selected: hour === index * 6 + j}">
                                {{ index * 6 + j }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tabulka2">
                    <div class="radek" v-for="(data, index) in Array(6)" :key="index">

                        <div v-for="(data, j) in Array(10)" :key="j">
                            <div class="bunka"
                                v-on:click="minute = index * 10 + j"
                                v-bind:class="{selected: minute === index * 10 + j}">
                                {{ index * 10+ j }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tabulka3">
                    <div class="radek" v-for="(data, index) in Array(6)" :key="index">

                        <div v-for="(data, j) in Array(10)" :key="j">
                            <div class="bunka"
                                v-on:click="second = index * 10 + j"
                                v-bind:class="{selected: second === index * 10 + j}">
                                {{ index * 10 + j }}
                            </div>
                        </div>
                    </div>
                </div>

            <div class=result> {{('0' + hour).slice(-2)}}:{{('0' + minute).slice(-2)}}:{{('0' + second).slice(-2)}} </div>
            <div class="submit" @click="submit">Submit</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "xkavan05",
        data() {
            if (this.value instanceof Date) {
                return {
                    hour: this.value.getHours(),
                    minute: this.value.getMinutes(),
                    second: this.value.getSeconds()
                }
            }
            return {
                hour: 0,
                minute: 0,
                second: 0
            }
        },

        props: {value: {}},
        methods: {
            submit() {
                this.$emit('submit');
                this.$emit('input', new Date(1970, 0, 0, this.hour, this.minute, this.second, 0))
            }
        }
    }
</script>

<style scoped>
    .selector {
        position: fixed;
        background-color: #bbbbbb66;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column-reverse;
    }

    .picker {
        width: 70vh;
        height: 75vh;
        background-color: white;
    }

    .radek {
        display: flex;
        flex-direction: row;
    }

    .tabulka1 {
        flex-direction: column;
        display: flex;
        background: #fff;
        margin: 0 auto;
        width: 180px;
        padding: 10px;
    }

    .tabulka2 {
        flex-direction: column;
        display: flex;
        background: #fff;
        margin: 0 auto;
        width: 300px;
        padding: 10px;
    }

    .tabulka3 {
        flex-direction: column;
        display: flex;
        background: #fff;
        margin: 0 auto;
        width: 300px;
        padding: 10px;
    }

    .bunka {
        width: 30px;
        border: 1px solid;
        text-align: center;
        background-color: #00BFFF;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
    }

    .selected {
        background-color: red;

    }

    .submit {
        background-color: dodgerblue;
        margin-top: 10px;

        color: white;
        cursor: pointer;
        padding: 1em;
    }

    .result {
        font-size: 70px;
    }

</style>
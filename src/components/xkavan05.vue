<!-- ITU - Inteligentní zadávání časových údajů - Iva Kavánková (xkavan05) -->

<template>
    <div class="all" @click="submit">
            <div class="picker" @click.stop>
                <!-- 1.tabulka s hodinami, rozgenerování, kliknutí, vybrání -->
                <div class="table_hour">
                    <div class="row" v-for="(data, index) in Array(4)" :key="index">
                        <div v-for="(data, j) in Array(6)" :key="j">
                            <div class="cell"
                                 v-on:click="hour = index * 6 + j"
                                 v-bind:class="{selected: hour === index * 6 + j}">
                                {{ index * 6 + j }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2.tabulka s minutami, rozgenerování, kliknutí, vybrání -->
                <div class="table_minute">
                    <div class="row" v-for="(data, index) in Array(6)" :key="index">
                        <div v-for="(data, j) in Array(10)" :key="j">
                            <div class="cell"
                                v-on:click="minute = index * 10 + j"
                                v-bind:class="{selected: minute === index * 10 + j}">
                                {{ index * 10+ j }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 3.tabulka se sekundami, rozgenerování, kliknutí, vybrání -->
                <div class="table_second">
                    <div class="row" v-for="(data, index) in Array(6)" :key="index">
                        <div v-for="(data, j) in Array(10)" :key="j">
                            <div class="cell"
                                v-on:click="second = index * 10 + j"
                                v-bind:class="{selected: second === index * 10 + j}">
                                {{ index * 10 + j }}
                            </div>
                        </div>
                    </div>
                </div>
                
            <!-- výpis vybraných hodnot, doplnění na 2 číslice -->
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

        props: {value: {}}, // sdílená hodnota s ostaními
        methods: {
            submit() {
                this.$emit('submit'); // vyvolání signálu na schování určité varianty
                this.$emit('input', new Date(1970, 0, 0, this.hour, this.minute, this.second, 0)) // vyvolání signálu na nastavení sdílených dat
            }
        }
    }
</script>

<style scoped>
    .all {
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
        background-color: white;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .table_hour {
        flex-direction: column;
        display: flex;
        background: #fff;
        margin: 0 auto;
        width: 180px;
        padding: 10px;
    }

    .table_minute {
        flex-direction: column;
        display: flex;
        background: #fff;
        margin: 0 auto;
        width: 300px;
        padding: 10px;
    }

    .table_second {
        flex-direction: column;
        display: flex;
        background: #fff;
        margin: 0 auto;
        width: 300px;
        padding: 10px;
    }

    .cell {
        width: 30px;
        border: 1px solid;
        text-align: center;
        background-color: #00BFFF;
        -webkit-touch-callout: none; /* pro iOS Safari */
        -webkit-user-select: none; /* pro Safari */
        -moz-user-select: none; /* pro Firefox */
        -ms-user-select: none; /* pro Internet Explorer/Edge */
        user-select: none;
    }

    .selected {
        background-color: red;
    }

    .submit {
        background-color: #1e90ff ;
        margin-top: 10px;
        color: white;
        cursor: pointer;
        padding: 1em;
    }

    .result {
        font-size: 70px;
    }

</style>
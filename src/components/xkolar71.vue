<template>
    <div class="Selector__wrapper" @click="$emit('submit')">

        <div class="Selector__container" @click.stop>

            <div class="Selector__sliders">
                <div class="Selector">
                    <div class="Selector__slider" :style="{top: (-(2.25)*(active[0]-1)) + 'em'}">
                        <span v-for="i in 3" @click="set(0, i)" :class="{active: active[0] === i, impossible: !possible(0, i)}">{{ (i - 1) }}</span>
                    </div>
                </div>
                <div class="Selector">
                    <div class="Selector__slider" :style="{top: (-(2.25)*(active[1]-1)) + 'em'}">
                        <span v-for="i in 10" @click="set(1, i)" :class="{active: active[1] === i, impossible: !possible(1, i)}">{{ (i - 1) }}</span>
                    </div>
                </div>
                :
                <div class="Selector">
                    <div class="Selector__slider" :style="{top: (-(2.25)*(active[2]-1)) + 'em'}">
                        <span v-for="i in 6" @click="set(2, i)" :class="{active: active[2] === i, impossible: !possible(2, i)}">{{ (i - 1) }}</span>
                    </div>
                </div>
                <div class="Selector">
                    <div class="Selector__slider" :style="{top: (-(2.25)*(active[3]-1)) + 'em'}">
                        <span v-for="i in 10" @click="set(3, i)" :class="{active: active[3] === i, impossible: !possible(3, i)}">{{ (i - 1) }}</span>
                    </div>
                </div>
            </div>

            <a class="Selector__submit" @click="$emit('submit')">Submit!</a>
        </div>

    </div>
</template>

<script>
    export default {
        name: "xkolar71",
        data() {
            if (this.value instanceof Date)
                return {
                    active: [
                        1 + Math.floor(this.value.getHours() / 10),
                        1 + this.value.getHours() % 10,
                        1 + Math.floor(this.value.getMinutes() / 10),
                        1 + this.value.getMinutes() % 10,
                    ],
                };
            return ({
                active: Array(4).fill(1)
            })
        },
        props: {value: {}},
        methods: {
            set(col, i) {
                this.possible(col, i) && this.$set(this.active, col, i);
                this.$emit('input', this.time);
            },
            possible(col, i) {
                let new_ = [...this.active];
                new_[col] = i;
                let [hoursTens, hoursMinors, minutesTens, minutesMinors] = new_;
                const hours = --hoursTens * 10 + --hoursMinors;
                const minutes = --minutesTens * 10 + --minutesMinors;

                return (0 <= hours && hours <= 23) && (0 <= minutes && minutes <= 59)
            }
        },
        computed: {
            time() {
                let [hoursTens, hoursMinors, minutesTens, minutesMinors] = this.active;
                const hours = --hoursTens * 10 + --hoursMinors;
                const minutes = --minutesTens * 10 + --minutesMinors;
                return new Date(1970, 0, 0, hours, minutes, 0, 0);
            }
        },
    }
</script>

<style scoped lang="scss">
    .Selector {
        display: inline-block;

        &__wrapper {
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

        &__container {
            height: 65vh;
            background-color: white;

            border-radius: 5pt;
            display: flex;
            flex-direction: column;
        }

        &__sliders {
            padding: calc(3em + 80%) 3em 3em;

            overflow: hidden;
        }

        &__submit {
            background-color: dodgerblue;

            border-radius: 0 0 5pt 5pt;
            color: white;
            cursor: pointer;
            padding: 1em;
        }

        &__slider {
            position: relative;

            transition: all ease 500ms;
            display: flex;
            flex-direction: column;
            margin-right: 2px;

            SPAN {
                cursor: pointer;
                font-size: 1.5em;
                flex: 1 1 auto;
                border-radius: 5pt;
                padding: .25em .3em;
                transition: all ease 500ms;
                height: 1em;
                line-height: 1em;

                &.active {
                    background-color: dodgerblue;
                    color: white;
                }

                &.impossible {
                    color: darkgray;
                }
            }
        }

    }
</style>
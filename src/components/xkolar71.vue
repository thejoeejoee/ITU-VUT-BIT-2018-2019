<template>
    <div class="Selector__container">
        <div class="Selector">
            <div class="Selector__slider" :style="{top: (-(2.4)*(active[0]-1)) + 'em'}">
                <span v-for="i in 3" @click="set(0, i)" :class="{active: active[0] === i}">{{ (i - 1) }}</span>
            </div>
        </div>
        <div class="Selector">
            <div class="Selector__slider" :style="{top: (-(2.4)*(active[1]-1)) + 'em'}">
                <span v-for="i in 10" @click="set(1, i)" :class="{active: active[1] === i}">{{ (i - 1) }}</span>
            </div>
        </div>
        :
        <div class="Selector">
            <div class="Selector__slider" :style="{top: (-(2.4)*(active[2]-1)) + 'em'}">
                <span v-for="i in 6" @click="set(2, i)" :class="{active: active[2] === i}">{{ (i - 1) }}</span>
            </div>
        </div>
        <div class="Selector">
            <div class="Selector__slider" :style="{top: (-(2.4)*(active[3]-1)) + 'em'}">
                <span v-for="i in 10" @click="set(3, i)" :class="{active: active[3] === i}">{{ (i - 1) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "xkolar71",
        data: () => ({
            active: Array(4).fill(null)
        }),
        methods: {
            set(col, i) {
                this.$set(this.active, col, i);
            }
        }
    }
</script>

<style scoped lang="scss">
    .Selector {
        display: inline-block;
        &__container {
            margin-top: 300px;
        }
        &__slider {
            position: relative;

            transition: all ease 500ms;
            display: flex;
            flex-direction: column;
            SPAN {
                cursor: pointer;
                font-size: 1.5em;
                flex: 1 1 auto;
                border-radius: 100%;
                padding: .3em;
                transition: all ease 500ms;
                height: 1em;
                line-height: 1em;
                &.active {
                    background-color: dodgerblue;
                    color: white;
                }
            }
        }

    }
</style>
<template>
    <div class="selector" @click="$emit('submit')">

        <div id="componentContainer" @click.stop>
            <div id="timeView">
                <span class="textCenter"> {{ renderedTime }} </span>
            </div>
            <div class="timeSelection">
                <div id="selectionsContainer"
                    v-on:mousemove="handleMouseMove"
                    v-on:mousedown="handleMouseDown"
                    v-on:mouseup="handleMouseUp"
                    v-on:mouseleave="handleMouseLeave">
                    <div v-for="(data, index) in selections" :key="index" v-bind:index="index" class="selectionCol">
                        <div class="numberSelection" 
                            v-bind:class="{ selectionSplit: index == 'hours_2', selectedNumber: selectedTime[index] == i }" 
                            v-on:click="selectNumber(index, i)"
                            v-for="i in data" :key="i"
                            v-bind:index="i">
                            {{ i }}
                        </div>
                    </div>
                </div>

                <v-stage ref="stage" :config="konvaConfig" class="canvasOverlay">
                    <v-layer ref="layer">
                        <v-line ref="line" :config="lineConfig">
                        </v-line>
                    </v-layer>

                    <v-layer>
                        <v-circle v-for="item in dots" :key="item.id" :config="item">
                        </v-circle>
                    </v-layer>
                </v-stage>      
            </div>
            <div id="submitButton" @click="$emit('submit')">
                <span class="textCenter"> Submit </span>
            </div>
        </div>
    </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;

let component = {};

export default {
    name: "xnguye16",
    mounted: function() { 
        component = this; 
        console.log("init");
    },

    data() {
        let d = {
            renderedTime: "--:--",
            selectedTime: {
                hours_1: "-",
                hours_2: "-",
                minutes_1: "-",
                minutes_2: "-"
            },

            selections: {
                hours_1: [...Array(3).keys()],
                hours_2: [...Array(10).keys()],
                minutes_1: [...Array(6).keys()],
                minutes_2: [...Array(10).keys()]
            },

            konvaConfig: {
                width: 220,
                height: 520
            },

            mousePressed: false,
            lineConfig: {
                points: [],
                stroke: "#6ab972",
                strokeWidth: 16,
                lineCap: "round",
                lineJoin: "round"
            },
            dots: []
        };

        if(this.value instanceof Date) {
            d.selectedTime.hours_1 = Math.floor(this.value.getHours() / 10).toString();
            d.selectedTime.hours_2 = this.value.getHours() % 10;
            d.selectedTime.minutes_1 = Math.floor(this.value.getMinutes() / 10);
            d.selectedTime.minutes_2 = this.value.getMinutes() % 10;
            const minutes = ('0' + this.value.getMinutes()).slice(-2);
            d.renderedTime = `${this.value.getHours()}:${minutes}`;
        }

        return d;
    },
    props: {value: {}},

    methods: {
        renderTime: () => {
            const selectedTime = component.selectedTime;
            for(let key in selectedTime) {
                if(selectedTime[key] == "-")
                    selectedTime[key] = 0;
            }

            const hours = selectedTime.hours_1 * 10 + selectedTime.hours_2;
            let minutes = selectedTime.minutes_1 * 10 + selectedTime.minutes_2;


            if(hours > 23)
                component.renderedTime = "--:--";
            else {
                minutes = ('0' + minutes).slice(-2);
                component.renderedTime = `${hours}:${minutes}`;
                let time = new Date(1970, 0, 0, hours, minutes, 0, 0);
                component.$emit('input', time);
            }
        },
        selectNumber: (numberOrder, number) => { 
            component.selectedTime[numberOrder] = number; 
            component.renderTime();
        },

        addPoint: (x, y) => {
            let stage = component.$refs.stage.getStage();
            let line = component.$refs.line;

            line.config.points.push(x);
            line.config.points.push(y);

            stage.draw();
        },

        addDot(newX, newY) {
            this.dots.push({
                x: newX,
                y: newY,
                fill: "red",
                stroke: "transparent",
                radius: 5
            }); 
        },

        clearLine: () => {
            let stage = component.$refs.stage.getStage();
            let line = component.$refs.line;

            line.config.points = [];

            stage.draw();
        },

        handleMouseMove: (e) => {
            if(component.mousePressed)
                component.addPoint(e.layerX, e.layerY);
        },

        handleMouseDown: (e) => {
            component.mousePressed = true; 
            component.clearLine();
            component.dots = [];
        },
        handleMouseUp: () => { 
            component.mousePressed = false; 
            component.analyzeLine();
        },
        handleMouseLeave: () => { component.mousePressed = false; },

        analyzeLine: () => {
            const line = component.$refs.line;
            const points = line.config.points;
            if(!points.length)
                return;

            let dY = [];
            let selectPoints = []
            

            for(let i = 2; i < points.length; i += 2)
                dY.push(points[i] - points[i - 2]);

            if(dY.length == 1)
                return;

            for(let i = 1; i < dY.length; i++) {
                if((dY[i] < 0 && dY[i - 1] > 0) || (dY[i] > 0 && dY[i - 1] < 0) || dY[i] == 0)
                    selectPoints.push({ x: points[2 + parseInt(i) * 2], y: points[parseInt(i) * 2 + 3] }); 
            }

            // end of the line
            selectPoints.push({ x: points[0], y: points[1] });
            // start of the line
            selectPoints.push({ x: points[points.length - 2], y: points[points.length - 1] });

            let linePoints = [];
            for(let i = 0, j = 0; i < points.length - 1; i += 2, j++)
                linePoints[j] = { x: points[i], y: points[i + 1] };
            component.determineSelection(selectPoints, linePoints);
        }, 

        determineSelection: (selectPoints, linePoints) => {
            let $selectionContainer = document.getElementById("selectionsContainer");
            const containerBoundingBox = $selectionContainer.getBoundingClientRect();

            const colSelectionMap = { 0: "hours_1", 1: "hours_2", 2: "minutes_1", 3: "minutes_2" };
            let setCols = {hours_1: false, hours_2: false, minutes_1: false, minutes_2: false};
            let result = {};
            for(let key in setCols)
                result[key] = component.selectedTime[key];

            let pointsOverNumber = {}

            for(let key in component.selections) {
                pointsOverNumber[key] = {};
                for(let number in component.selections[key])
                    pointsOverNumber[key][number] = 0;
            }

            let inRange = (v, min, max) => { return v >= min && v <= max; };
            let filterChildren = function* ($parent, cond) {
                for(let i in $parent.childNodes) { 
                    if(cond($parent.childNodes[i])) 
                        yield $parent.childNodes[i];
                }; 
            };

            let isDiv = ($el) => { return $el.nodeName == "DIV" };

            for(let $colContainer of filterChildren($selectionContainer, isDiv)) {
                const colSelectionType = $colContainer.getAttribute("index");

                for(let $cell of filterChildren($colContainer, isDiv)) {
                    const boundingBox = $cell.getBoundingClientRect();
                    const relRect = {
                        x: boundingBox.x - containerBoundingBox.x,
                        y: boundingBox.y - containerBoundingBox.y,
                        width: boundingBox.width,
                        height: boundingBox.height
                    };

                    for(let i in selectPoints) {
                        const point = selectPoints[i];

                        if(inRange(point.x, relRect.x, relRect.x + relRect.width) &&
                            inRange(point.y, relRect.y, relRect.y + relRect.height)) {

                            if(setCols[colSelectionType])
                                continue;
                            setCols[colSelectionType] = true;
                            result[colSelectionType] = parseInt($cell.textContent);
                        }
                    }

                    for(let i in linePoints) {
                        const point = linePoints[i];

                        if(inRange(point.x, relRect.x, relRect.x + relRect.width) &&
                            inRange(point.y, relRect.y, relRect.y + relRect.height)) {
                            pointsOverNumber[colSelectionType][parseInt($cell.textContent)] += 1;
                        }
                    }
                }
            }
            
            // remaining
            const missing = Object.keys(result).filter(x => result[x] == "-");
            if(missing.length >= 3) {
                for(let col of Object.keys(result).filter(x => result[x] != "-"))
                    component.selectedTime[col] = result[col];
                component.renderTime();
                return;
            } 

            for(let missingCols of missing) {
                const stats = pointsOverNumber[missingCols];
                
                const numberWithMax = Object.keys(stats).reduce((a, b) => (stats[a] > stats[b]) ?a :b);
                result[missingCols] = parseInt((stats[numberWithMax]) ?numberWithMax :0);
            }

            component.selectedTime = result;
            component.renderTime();
        }
    }
};


</script>

<style scoped>
@font-face {
    font-family: Roboto;
    src: url(https://fonts.googleapis.com/css?family=Roboto);
}

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

#submitButton {
    cursor: pointer;
    width: auto;
    height: 50px;
    background-color: #414142;
    color:white;
    font-family: Roboto;
    font-size: 25px;
    text-align: center;
    line-height: 50px;
}

#timeView {
    background-color: #0284bc;
    color: white;
    width: auto;
    height: 90px;
    font-family: Roboto;
    font-size: 50px;
    text-align: center;
    line-height: 90px;
}

.textCenter {    
    display: inline-block;
    vertical-align: middle;
}

.selectionSplit {
    margin-right: 15px;
}

.timeSelection {
    width: auto;
    position: relative;
}

#componentContainer {
    display: inline-block;
    background-color: #efefef;
    width: 220px;
    height: 90 + 520 + 50px;

    position: relative;
    display: flex;
    flex-direction: column;
}

#selectionsContainer {
    cursor: pointer;
    margin: 20px 10px 20px 10px;
    display: flex;
    flex-direction: row;
}

.selectionCol:not(:first-child) {
    margin-left: -5px;
}

.numberSelection {
    cursor: pointer;
    padding: 0px 12px 0px 12px;
    flex-direction: column;
    font-family: Roboto;
    font-size: 40px;
    color: #414142;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
}

.selectedNumber {
    color: white;
    background-color: #0284bc;
    border-radius: 24px;
}

.canvasOverlay {
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;

    background-color: transparent;
    opacity: 0.7;
}
</style>




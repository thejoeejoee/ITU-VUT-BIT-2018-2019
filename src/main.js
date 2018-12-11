import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueKonva from 'vue-konva'

Vue.use(VueKonva)

Vue.config.productionTip = false;

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = "0" + s;
    }
    return s;
};

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');

import Vue from 'vue';
import ElementUI from 'element-ui';
import welcom from 'com/welcom.vue';
import taxt from './src/text/test.txt';
import layout from './src/layout.vue';

// css
import 'element-ui/lib/theme-chalk/index.css';
import './src/css/global.css'

// plugin
Vue.use(ElementUI);

const app = new Vue({
    render(h) {
        return h(layout);
    },
    mounted() {
        console.log(taxt);
    }
});
app.$mount('#app');
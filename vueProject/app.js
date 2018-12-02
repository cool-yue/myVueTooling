import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import ElementUI from "element-ui";
import http from "./src/ajaxUtil/http.js";

// layout
import layout from "./src/layout.vue";
import routes from "./src/router/route.js";

// css
import "element-ui/lib/theme-chalk/index.css";
import "./src/css/global.css";
import { request } from "https";

// plugin
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.prototype.$http = http;

let store = new Vuex.Store({
    state:{
        count:0,
        reqPrefix:"/api"
    }
});
const router = new VueRouter({
    base:"/",
    routes
});

const app = new Vue({
    router,
    store,
    render(h) {
        return h(layout);
    },
    mounted() {
        //console.log(taxt);
    }
});
app.$mount("#app");
require("./bootstrap");

// Import modules...
import {
    App as InertiaApp,
    plugin as InertiaPlugin
} from "@inertiajs/inertia-vue";
import moment from "moment";
import PortalVue from "portal-vue";
import Vue from "vue";
import store from "./store";

moment.locale("pt-br");

Vue.filter("formatDate", function(value) {
    if (value) {
        return moment(value).format("DD/MM/YYYY HH:mm");
    }
});

store.dispatch("userStateAction");

Vue.mixin({ methods: { route } });
Vue.use(InertiaPlugin);
Vue.use(PortalVue);

const app = document.getElementById("app");

new Vue({
    render: h =>
        h(InertiaApp, {
            props: {
                initialPage: JSON.parse(app.dataset.page),
                resolveComponent: name => require(`./Pages/${name}`).default
            }
        })
}).$mount(app);

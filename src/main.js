import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "./components/Home.vue";
import "./index.css";


const routes = [
  {
    path: "/discord-anonymous-post/",
    component: Home,
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

const app = createApp(App);
app.use(router);
app.mount("#app");

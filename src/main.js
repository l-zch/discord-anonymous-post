import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import ChatRoom from "./components/ChatRoom.vue";
import "./index.css";

const routes = [
  {
    path: "/discord-anonymous-post/",
    component: ChatRoom,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");

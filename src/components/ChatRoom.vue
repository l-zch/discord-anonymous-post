<template>
  <Login v-if="status == 'noLogging'"></Login>
  <Loading v-if="status == 'loading'"></Loading>
  <div class="h-full w-full text-white" v-if="status == 'loggedIn'">
    <div class="fixed top-0 mx-auto w-full bg-[#18191c] p-[16px]">
      <div
        class="absolute top-0 left-0 h-[66px] w-full"
        :style="{ backgroundColor: userData?.banner_color }"
      ></div>
      <img
        class="h-[100px] w-[100px] scale-100 rounded-[50%] border-[6px] border-[#18191c]"
        :src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`"
      />
      <b>{{ userData?.username }}</b>
      <b class="text-[#b9bbbe]">#{{ userData?.discriminator }}</b>
    </div>
    <MessageBar class="left-0 right-0 bottom-0 m-[16px] fixed"></MessageBar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Login from "./Login.vue";
import Loading from "./Loading.vue";
import axios from "axios";
import MessageBar from "./chat-room/MessageBar.vue";
import { useCookies } from "@vueuse/integrations/useCookies";


const route = useRoute();
const router = useRouter();
const code = route.query.code;
const status = ref("noLogging");
const userData = ref({});

let get

const cookies = useCookies(["locale"]);
let access_token = cookies.get("access_token");

login()

async function get_access_token() {

  if (!access_token && code) {
    const tokens = await exchangeCode(code);
    access_token = tokens["access_token"]
    cookies.set("access_token", access_token, { path:'/', maxAge: 604800, secure: true, sameSite: true });
  }
  return access_token;
}

async function login() {
  if (access_token || code) {
    status.value = "loading";
    const access_token =  await get_access_token();
    get = getWithToken(access_token);
    userData.value = await get("/users/@me");
    status.value = "loggedIn";
  }
}

async function exchangeCode() {
  try {
    const response = await axios.get(
      `https://app.discordanonpost.repl.co/exchange-code?code=${code}`
    );
    return response.data;
  } catch (error) {
    router.replace({ path: '/discord-anonymous-post/', query: null });
  }
}

function getWithToken(token) {
  async function get(path) {
    const response = await axios.get(`https://discord.com/api${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
  return get;
}
</script>

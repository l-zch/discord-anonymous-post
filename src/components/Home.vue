<template>
  <Login v-if="status == 'noLogging'"></Login>
  <Loading v-if="status == 'loading'"></Loading>
  <div class="h-full w-full text-white" v-if="status == 'loggedIn'">

    <div class="mx-auto w-full bg-[#18191c] top-0 fixed p-[16px]">
      <div class="w-full h-[66px] top-0 left-0 absolute" :style="{backgroundColor: userData?.banner_color}"></div>
      <img
      class="h-[100px] w-[100px] rounded-[50%] scale-100 border-[#18191c] border-[6px]"
      :src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`">
      <b>{{ userData?.username }}</b>
      <b class="text-[#b9bbbe]">#{{ userData?.discriminator }}</b>
    </div>

    <div class="flex min-h-[50px] h-max w-auto left-0 right-0 bottom-0 rounded-[3px] bg-[#40444b] items-start m-[16px] px-[16px] py-[11px] fixed">
      <svg class="mr-[16px] mt-[2px]" width="24" height="24" viewBox="0 0 24 24" @click="open">
        <path
          fill="#dcddde"
          d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
        ></path>
      </svg>
      <div v-for="file in files"></div>

      <textarea
        ref="textarea"
        v-model="input"
        class="bg-transparent outline-none placeholder-[#dcddde] w-full resize-none"
        placeholder="傳訊息到 😼匿名貓咪"
      />
    </div>
  </div>
  
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useMagicKeys, whenever } from "@vueuse/core";
import { useFileDialog, useTextareaAutosize,onKeyStroke } from "@vueuse/core"
import Login from "./Login.vue";
import Loading from "./Loading.vue"
import axios from "axios";


onKeyStroke('Enter', (e) => {
  if (!e.shiftKey) {
    if (input.value) {
      console.log(input.value);
      textarea.value.value = ''
      input.value = '';
    }
    e.preventDefault();
  }
})

const route = useRoute();
const code = route.query.code;
const status = ref("noLogging");
const { files, open, reset } = useFileDialog();
const { textarea, input } = useTextareaAutosize();
const { shift, enter,c } = useMagicKeys();
const userData = ref({})

if (code) {
  a(code);
}

async function a(code) {
  status.value = "loading";
  const tokens = await exchangeCode(code);
  const get = getWithToken(tokens["access_token"]);
  userData.value = await get("/users/@me");
  console.log(userData.value);
  status.value = "loggedIn";
}

async function exchangeCode() {
  const response = await axios.get(
    `https://app.discordanonpost.repl.co/exchange-code?code=${code}`
  );
  return response.data;
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

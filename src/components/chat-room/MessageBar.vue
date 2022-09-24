<template>
  <div
    class="m-[16px] flex max-h-[50%] flex-col rounded-[3px] bg-[#40444b] px-[16px] py-[11px]"
  >
    <div
      class="absolute right-0 top-[-410px] flex h-[400px] w-[420px] overflow-y-auto rounded-[3px] bg-black drop-shadow-lg"
      v-if="emojiPickerOpened"
    >
      <div class="h-full w-[40px] px-[10px]">
        <div
          v-for="d in data"
          class="mt-[9px] h-[30px] w-[30px] overflow-hidden text-ellipsis bg-[#4c4c4c] rounded-[15px]"
        >
          <img class="object-cover rounded-[15px]" :src="`https://cdn.discordapp.com/icons/${d.id}/${d.icon}`" v-if="d.icon"/>
          <text class="text-[5px]" v-if="!d.icon">{{d.name}}</text>
        </div>
      </div>
      <div class="grid w-[370px] auto-rows-min grid-cols-9 px-[5px]">
        <div
          class="m-0 flex h-[40px] w-[40px] rounded-[3px] hover:bg-[#4c4c4c]"
          v-for="i in 100"
        >
          <div class="m-auto h-[30px] w-[30px] bg-white"></div>
        </div>
      </div>
    </div>
    <Attachments></Attachments>
    <div class="relative flex h-full w-full overflow-y-auto">
      <div class="mt-[2px] h-full w-[24px]">
        <UploadButton class="fixed" @click="open"></UploadButton>
      </div>
      <textarea
        ref="textarea"
        v-model="input"
        class="mx-[11px] flex-grow resize-none bg-transparent placeholder-[#dcddde] outline-none"
        placeholder="傳訊息到 😼匿名貓咪"
      />
      <div class="mt-[2px] h-full w-[24px]">
        <div
          class="fixed h-[24px] w-[24px] rounded-[12px] bg-red-500"
          @click="emojiPickerOpened = !emojiPickerOpened"
        ></div>
      </div>
    </div>
    <div
      class="fixed top-[100px] h-[100px] w-[100px] bg-white"
      @click="test"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useFileDialog, useTextareaAutosize, onKeyStroke } from "@vueuse/core";

import { useStore } from "./store";
import Attachments from "./Attachments.vue";
import UploadButton from "./UploadButton.vue";
import { getWithToken } from "../../api/discord/http";
import { useCookies } from "@vueuse/integrations/useCookies";

const { open, files } = useFileDialog();
const { textarea, input } = useTextareaAutosize();
const messageStore = useStore();
const emojiPickerOpened = ref(false);
const data = ref();

const cookies = useCookies(["locale"]);
let access_token = cookies.get("access_token");

async function test() {
  const get = getWithToken(access_token);
  data.value = await get("/users/@me/guilds");
  console.log(data.value)
}

onKeyStroke("Enter", (e) => {
  if (!e.shiftKey) {
    if (input.value) {
      send(input.value);
      textarea.value.value = "";
      input.value = "";
      messageStore.$reset();
    }
    e.preventDefault();
  }
});

watch(files, (newFiles, _) => {
  console.log("check");
  for (let file of newFiles) messageStore.addAttachments(file);
});
</script>

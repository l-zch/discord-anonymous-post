<template>
  <div
    class="m-[16px] flex max-h-[50%] flex-col rounded-[3px] bg-[#40444b] px-[16px] py-[11px]"
  >
    <Attachments></Attachments>
    <div class="flex  w-full h-full relative overflow-y-auto">
    <div class="mt-[2px] h-full w-[24px]">
      <UploadButton class="fixed" @click="open"></UploadButton>
    </div>
      <textarea
        ref="textarea"
        v-model="input"
        class="mx-[11px] flex-grow resize-none bg-transparent placeholder-[#dcddde] outline-none"
        placeholder="傳訊息到 😼匿名貓咪"
      />
      <div class="w-[24px] h-full mt-[2px] ">
        <div class="bg-red-500 w-[24px] h-[24px] rounded-[12px]  fixed"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useFileDialog, useTextareaAutosize, onKeyStroke } from "@vueuse/core";
import axios from "axios";

import { baseURL } from "../../api/constant";
import { useStore } from "./store";
import Attachments from "./Attachments.vue";
import UploadButton from "./uploadButton.vue";


const { open, files } = useFileDialog();
const { textarea, input } = useTextareaAutosize();
const messageStore = useStore();

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

async function send(content) {
  axios.post(
    baseURL + "/send",
    {
      content: content,
    },
    { withCredentials: true }
  );
}
</script>

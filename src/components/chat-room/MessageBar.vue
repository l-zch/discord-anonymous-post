<template>
  <div
    class="m-[16px] flex max-h-[50%] flex-col rounded-[3px] bg-[#40444b] px-[16px] py-[11px]"
  >
    <Attachments></Attachments>
    <div class="flex h-max w-full overflow-y-auto">
      <svg
        class="fixed mt-[2px]"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        @click="open"
      >
        <path
          fill="#dcddde"
          d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
        ></path>
      </svg>

      <textarea
        ref="textarea"
        v-model="input"
        class="ml-[40px] w-full resize-none bg-transparent placeholder-[#dcddde] outline-none"
        placeholder="傳訊息到 😼匿名貓咪"
      />
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useFileDialog, useTextareaAutosize, onKeyStroke } from "@vueuse/core";
import Attachments from './Attachments.vue'
import axios from "axios";
import { baseURL } from "../../api/constant";
import { useStore } from './store'


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
  console.log("check")
  for (let file of newFiles) 
    messageStore.addAttachments(file);
})

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
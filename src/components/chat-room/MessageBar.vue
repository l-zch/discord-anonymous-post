<template>
  <div
    class="m-[16px] flex max-h-[50%] flex-col rounded-[3px] bg-[#40444b] px-[16px] py-[11px]"
  >
    <div class="flex flex-row border-b-2 border-[#4c4c4c] mb-[11px]" v-if="!fileIsEmpty(">
      <div
        class="relative mb-[10px] mr-[20px] flex h-[150px] w-[150px] shrink-0 flex-col rounded-[10px] bg-[#363636]"
        v-for="[fileID, file] in Object.entries(uploadedFiles)"
      >
        <div
          class="absolute right-[-10px] h-[30px] w-[30px] rounded-[5px] bg-black"
          @click="removeFile(fileID)"
        >
          X
        </div>
        <div class="z-10 m-auto h-[60%] w-[60%] bg-red-200"></div>
        <text
          class="mx-auto mt-[-10%] w-[80%] overflow-hidden text-ellipsis whitespace-nowrap p-[5px] text-center"
        >
          {{ file.name }}
        </text>
      </div>
    </div>
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
import { ref, watch } from "vue";
import { useFileDialog, useTextareaAutosize, onKeyStroke } from "@vueuse/core";
import axios from "axios";
import { baseURL } from "../../api/constant";

const { files, open, reset } = useFileDialog();
const { textarea, input } = useTextareaAutosize();
let fileID = 0;
const uploadedFiles = ref({})

watch(files, (newFiles, _) => {
  for (let file of newFiles) {
    uploadedFiles.value[fileID] = file;
    ++fileID;
  }
})

const removeFile = fileID => delete uploadedFiles.value[fileID]

const fileIsEmpty = () => !Object.keys(uploadedFiles.value).length

onKeyStroke("Enter", (e) => {
  if (!e.shiftKey) {
    if (input.value) {
      send(input.value);
      textarea.value.value = "";
      input.value = "";
      fileID = 0;
      uploadedFiles.value = {};
    }
    e.preventDefault();
  }
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
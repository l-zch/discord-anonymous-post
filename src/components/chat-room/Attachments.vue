<template>
  <div class="flex flex-row border-b-2 border-[#4c4c4c] mb-[11px]" v-if="!attachmentIsEmpty()">
      <div
        class="relative mb-[10px] mr-[20px] flex h-[150px] w-[150px] shrink-0 flex-col rounded-[10px] bg-[#363636]"
        v-for="[id, attachment] in Object.entries(attachments)"
      >
        <div
          class="absolute right-[-10px] h-[30px] w-[30px] rounded-[5px] bg-black"
          @click="messageStore.removeAttachment(id)"
        >
          X
        </div>
        <div class="z-10 m-auto h-[60%] w-[60%] bg-red-200"></div>
        <text
          class="mx-auto mt-[-10%] w-[80%] overflow-hidden text-ellipsis whitespace-nowrap p-[5px] text-center"
        >
          {{ attachment.name }}
        </text>
      </div>
    </div>
</template>

<script setup>
import { watch } from "vue";
import { useFileDialog } from "@vueuse/core";
import { useStore } from './store'
import { storeToRefs } from 'pinia'

const { files } = useFileDialog();
const messageStore = useStore();
const { attachments } = storeToRefs(messageStore)


watch(files, (newFiles, _) => {
  alert("check")
  for (let file of newFiles) 
    messageStore.addAttachments(file);
})

const attachmentIsEmpty = () => !Object.keys(attachments.value).length

</script>
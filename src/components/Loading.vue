<template>
  <div
    class="m-auto flex h-[34vmin] w-[40vmin] flex-col items-center justify-center"
  >
    <div class="relative">
      <div class="absolute top-[14vmin] left-[5vmin] z-10 flex">
        <img
          class="h-[5vmin] w-[5vmin]"
          src="https://static.wixstatic.com/media/b3240e_97c3cf5024c544c395a83757bad22761~mv2.gif"
        />
        <b class="ml-[1vmin] text-[5vmin] leading-[5vmin] text-white">{{
          `Loading${".".repeat([0,1,2,3,2,1][counter % 6])}`
        }}</b>
      </div>
      <img
        class="z-10 scale-100"
        src="https://media.discordapp.net/attachments/954718717974044703/1009304298573803600/image824.png"
      />
    </div>
  </div>
</template>

<script setup>
import { useInterval } from "@vueuse/core";

const counter = useInterval(100);
</script>

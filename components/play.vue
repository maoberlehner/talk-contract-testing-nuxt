<script setup>
import { ref } from 'vue';

const counter = ref(0)
const play = () => {
  counter.value = 0;
  const $videos = document.querySelectorAll('.js-video-compare')
  const interval = setInterval(() => { counter.value += 1 }, 1000)
  const pause = () => {
    clearInterval(interval);
    $videos.forEach(v => (v.pause()))
  }
  setTimeout(() => pause(), 1600)
  $videos.forEach(v => (v.currentTime = 0, v.play()))
}
const proceed = () => {
  const $videos = document.querySelectorAll('.js-video-compare')
  const interval = setInterval(() => { counter.value += 1 }, 1000)
  setTimeout(() => clearInterval(interval), 8000)
  $videos.forEach(v => v.play())
}
</script>

<template>
  <div style="text-align: center;">
    0:0{{ counter }}
    <div style="margin-top:10px;font-size:26px;height:42px;">
      <button v-if="counter === 0 || counter === 9" @click="play">
        Play
      </button>
      <button v-if="counter === 1" @click="proceed">
        Proceed
      </button>
    </div>
  </div>
</template>

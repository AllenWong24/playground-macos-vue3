<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface Props {
  setRMRF: (value: boolean) => void;
}

const props = defineProps<Props>();

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789富强民主文明和谐自由平等公正法治爱国敬业诚信友善";

const emojis = [
  "\\(o_o)/",
  "(˚Δ˚)b",
  "(^-^*)",
  "(╯‵□′)╯",
  "\\(°ˊДˋ°)/",
  "╰(‵□′)╯",
];
const getEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
};

let canvas = null as HTMLCanvasElement | null;
let ctx = null as CanvasRenderingContext2D | null;
let intervalId = -1;
let emoji = getEmoji();
let fontSize = 12;
let drops = [] as number[];

const rain = () => {
  ctx = ctx as CanvasRenderingContext2D;
  canvas = canvas as HTMLCanvasElement;

  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#2e9244";
  ctx.font = `${fontSize}px arial`;

  for (let i = 0; i < drops.length; i++) {
    const text = characters[Math.floor(Math.random() * characters.length)];

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // sends the drop back to the top randomly after it has crossed the screen
    // adding randomness to the reset to make the drops scattered on the Y axis
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    // increments Y coordinate
    drops[i]++;
  }
};

onMounted(() => {
  const container = document.querySelector(
    "#how-dare-container"
  ) as HTMLElement;

  canvas = document.querySelector("#how-dare") as HTMLCanvasElement;
  canvas.height = container.offsetHeight;
  canvas.width = container.offsetWidth;
  ctx = canvas.getContext("2d");

  const columns = canvas.width / fontSize;
  drops = [];
  // x: x coordinate, 1: y-coordinate
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  intervalId = setInterval(rain.bind(this), 33);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div
    id="how-dare-container"
    class="fixed w-full h-full bg-black text-white"
    @click="() => props.setRMRF(false)"
  >
    <canvas id="how-dare"></canvas>
    <div
      class="font-avenir absolute text-center h-28 mx-auto -mt-20 bottom-0 left-0 right-0 top-1/2"
    >
      <div class="text-4xl">{{ emoji }}</div>
      <div class="text-3xl mt-4">HOW DARE YOU!</div>
      <div class="mt-4">Click to go back</div>
    </div>
  </div>
</template>

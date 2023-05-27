<template>
  <SlotMachine
    ref="myLucky"
    :width="'100vw'"
    :height="490"
    :prizes="LuckyDate.prizes"
    :blocks="LuckyDate.blocks"
    :slots="LuckyDate.slots"
    :defaultConfig="LuckyDate.defaultConfig"
    @end="endCallback"
  />
  <div class="hello_one">
    <button @click="start">play</button>
    <button @click="pause">pause</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

let myLucky = ref(null);

let LuckyDate = ref({
  // 背景颜色
  blocks: [
    {
      borderRadius: "100px",
      background: "blue",
      padding: "10px",
      imgs: [
        {
          src: "/public/picture.webp",
        },
      ],
    },
  ],
  // 插槽
  slots: [{ speed: 3 }, { speed: 2 }, { speed: 1 }, { speed: 2 }],
  // 奖品
  prizes: [
    {
      background: "green",
      borderRadius: "0px",
      fonts: [
        {
          text: "hello",
        },
      ],
    },
    {
      background: "red",
      borderRadius: "0px",
      fonts: [
        {
          text: "2",
        },
      ],
    },
    {
      background: "blue",
      borderRadius: "0px",
      fonts: [
        {
          text: "3",
        },
      ],
    },
    {
      background: "black",
      borderRadius: "0px",
      fonts: [
        {
          text: "4",
        },
      ],
    },
    {
      background: "yellow",
      borderRadius: "0px",
    },
    {
      background: "white",
      borderRadius: "0px",
    },
  ],
  // 默认配置
  defaultConfig: {
    rowSpacing: "5px",
    colSpacing: "5px",
  },
});

/*
function startCallback() {
  // 调用抽奖组件的play方法开始游戏
  myLucky.value.play();
  // 模拟调用接口异步抽奖
  setTimeout(() => {
    // 假设后端返回的中奖索引是0
    const index = 0;
    // 调用stop停止旋转并传递中奖索引
    myLucky.value.stop(index);
  }, 3000);
}
*/

// 抽奖结束会触发end回调
function endCallback(prize) {
  console.log(prize);
}

function start() {
  console.log("hello");
  myLucky.value.play();
}

function pause() {
  myLucky.value.stop(1);
}
</script>

<style scoped>
/* .hello_one{
  position: absolute;
  top: 239px;
  left: 483px;
} */
</style>

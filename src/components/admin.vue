<template>
  <div class="box">
    <div class="header">header</div>
    <div class="main">
      <tiger
        :slotSymbols="slotSymbols"
        :transitionDelay="transitionDelay"
        :moveTop="moveTop"
        :transitionDuration="transitionDuration"
        :autoValue="autoValue"
        ref="tigerRef"
      ></tiger>
    </div>
    <div class="foot">
      <div class="money">money</div>
      <button @click="clickMove">PLAY</button>
      <button @click="clickAuto">AUTO</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import tiger from "@/components/tiger.vue";
import { v4 as uuidv4 } from "uuid";
uuidv4();

//奖品数据
let slotSymbols = reactive([
  [
    { id: uuidv4(), value: "😀" },
    { id: uuidv4(), value: "😁" },
    { id: uuidv4(), value: "😂" },
    { id: uuidv4(), value: "😃" },
    { id: uuidv4(), value: "😄" },
    { id: uuidv4(), value: "😅" },
    { id: uuidv4(), value: "😆" },
    { id: uuidv4(), value: "😇" },
    { id: uuidv4(), value: "😈" },
    { id: uuidv4(), value: "😉" },
    { id: uuidv4(), value: "😊" },
    { id: uuidv4(), value: "🙂" },
  ],
  [
    { id: uuidv4(), value: "🍎" },
    { id: uuidv4(), value: "🍏" },
    { id: uuidv4(), value: "🍐" },
    { id: uuidv4(), value: "🍊" },
    { id: uuidv4(), value: "🍋" },
    { id: uuidv4(), value: "🍌" },
    { id: uuidv4(), value: "🍉" },
    { id: uuidv4(), value: "🍇" },
    { id: uuidv4(), value: "🍓" },
    { id: uuidv4(), value: "🍈" },
    { id: uuidv4(), value: "🍒" },
    { id: uuidv4(), value: "🍑" },
  ],
  [
    { id: uuidv4(), value: "⭐️" },
    { id: uuidv4(), value: "🌟" },
    { id: uuidv4(), value: "✨" },
    { id: uuidv4(), value: "💫" },
    { id: uuidv4(), value: "⚡️" },
    { id: uuidv4(), value: "☄️" },
    { id: uuidv4(), value: "🌠" },
    { id: uuidv4(), value: "🌌" },
    { id: uuidv4(), value: "🌙" },
    { id: uuidv4(), value: "🌕" },
    { id: uuidv4(), value: "🌖" },
    { id: uuidv4(), value: "🌗" },
  ],
  [
    { id: uuidv4(), value: "🍔" },
    { id: uuidv4(), value: "🍕" },
    { id: uuidv4(), value: "🌭" },
    { id: uuidv4(), value: "🍟" },
    { id: uuidv4(), value: "🍗" },
    { id: uuidv4(), value: "🍖" },
    { id: uuidv4(), value: "🌮" },
    { id: uuidv4(), value: "🌯" },
    { id: uuidv4(), value: "🥙" },
    { id: uuidv4(), value: "🍝" },
    { id: uuidv4(), value: "🍜" },
    { id: uuidv4(), value: "🍲" },
  ],
  [
    { id: uuidv4(), value: "🍩" },
    { id: uuidv4(), value: "🍪" },
    { id: uuidv4(), value: "🎂" },
    { id: uuidv4(), value: "🍰" },
    { id: uuidv4(), value: "🍫" },
    { id: uuidv4(), value: "🍬" },
    { id: uuidv4(), value: "🍭" },
    { id: uuidv4(), value: "🍮" },
    { id: uuidv4(), value: "🍦" },
    { id: uuidv4(), value: "🍨" },
    { id: uuidv4(), value: "🍧" },
    { id: uuidv4(), value: "🍥" },
  ],
]);

// 每列(父元素.symbols)元素滚动的延迟时间
let transitionDelay = reactive([0, 0, 0, 0, 0]);

// 每列(父元素.symbols)元素滚动的总时长
let transitionDuration = reactive([5000, 5000, 5000, 5000, 5000]);

// 移动数据
let moveTop = reactive(["-700px","-700px","-700px","-700px","-700px"]);

//点击自动按钮的值
let autoValue = ref(2)


// 定义tigerRef组件的$ref
const tigerRef =ref()

function clickMove(){
    tigerRef.value.clickMove()
    // console.log("hell0")
}

function clickAuto(){
    tigerRef.value.clickAuto()
    console.log("hell0")
}

</script>

<style scoped lang="scss">
.box {
//   background-color: aqua;
  display: flex;
  flex-direction: column;
}
.header {
  background-color: blanchedalmond;
  height: 20vh;
}
.main {
  background-color: #2B1D44;
  height: 60vh;
}
.foot {
  background-color: burlywood;
  height: 20vh;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
}
</style>

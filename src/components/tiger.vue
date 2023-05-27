<template>
  <div class="container">
    <div class="slotcontainer" ref="slotcontainer">
      <!-- 每一列 爷爷元素-->
      <div class="slot" v-for="(item, index) of props.slotSymbols" :key="index">
        <!-- 父元素 -->
        <div class="symbols" id="slot1Symbols">
          <!-- 子元素 -->
          <div class="symbol" v-for="subItem of item" :key="subItem.id">
            {{ subItem.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

//第一次点spin(),不执行重置数据
let spun = false;

const slotcontainer = ref();

// 孙子元素的总高度：内容+ padding + margin
let grandsonHeight = ref(0);

let totalHeight = ref(0);

// console.log(Math.ceil(Math.random()* 10))

// 这里只执行一次
onMounted(() => {
  // 将每位爷爷元素放进数组里
  let slotArray = Array.from(slotcontainer.value.children);

  // 遍历爷爷元素数组
  slotArray.forEach((slot, index) => {
    let symbols = slot.firstElementChild;
    // 这是爷爷元素: slot,拿到子元素的怪异盒高度
    const symbolHeight = slot.firstElementChild.clientHeight;

    //这些可以不写在这里，性能不好

    // 还需要拿到孙子元素的高度
    grandsonHeight.value =
      slot.firstElementChild.firstElementChild.clientHeight +
      slot.firstElementChild.firstElementChild.offsetTop * 2;

    // 总高度
    let numArray = Array.from(slot.firstElementChild.children);
    totalHeight = grandsonHeight.value * numArray.length;

    // 每列(父元素.symbols)元素滚动的延迟时间
    symbols.style.transitionDelay = props.transitionDelay[index] + "ms";

    // 每列(父元素.symbols)元素滚动的总时长
    symbols.style.transitionDuration = props.transitionDuration[index] + "ms";
  });
});

// 打乱数据函数
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 重置数据,对儿子的过渡赋空值，对定位top赋值为0
function reset() {
  let slotArray = Array.from(slotcontainer.value.children);

  slotArray.forEach((slot, index) => {
    // 拿到父元素
    const symbols = slot.firstElementChild;

    // 对父元素transition过渡赋none
    symbols.style.transition = "none";

    // 对父元素绝对定位赋自己的高度值
    // console.log(symbols.style.top)

    // symbols.style.top = symbols.style.top;

    // 父元素的怪异盒模型的高，这是一个让浏览器强制刷新的
    symbols.offsetHeight;

    //对父元素渡赋all 1s,不知道为什么赋这个值才行，不然下一次点击没效果
    // symbols.style.transition = "all 10s";

    // 打乱数组
    shuffleArray(props.slotSymbols[index]);
  });
}

// 导出的方法
// 单击play
function clickMove() {
  return new Promise((resolve) => {
    if (spun) {
      // 重置数据,对儿子的过渡赋空值，对定位top赋值为0
      reset();
    }

    // 将每位爷爷元素放进数组里
    let slotArray = Array.from(slotcontainer.value.children);

    //对子元素transitionend触发的回调函数计数，达到最后一个子元素时，显示所有的内容
    let completedSlots = 0;


    // 遍历爷爷元素数组
    slotArray.forEach((slot, index) => {
      //   随机数，1-10
      //   arr.push(Math.ceil(Math.random()* 10))
      //拿到每一个父元素
      let symbols = slot.firstElementChild;

      // 需要导出去
      // 孙子元素的内容高
      const symbolHeight = symbols.firstElementChild.clientHeight;

      //孙子数量
      const symbolCount = symbols.childElementCount;

      symbols.style.transition = "all 10s";

      symbols.style.top = "-700px";

      // 父元素添加transitionend
      // transitionend 事件的事件处理函数，在某个 CSS transition 完成时触发
      symbols.addEventListener(
        "transitionend",
        () => {
          completedSlots++;
          // completedSlots等不等于爷爷数组数量，遍历爷爷数组到最后一个才执行
          if (completedSlots === slotArray.length) {
            //往后将重置数据
            spun = true;
            resolve();
          }
        },
        // once一个布尔值，表示回调函数在添加之后最多只调用一次。
        // 如果为 true，回调函数会在其被调用之后自动移除。
        { once: true }
      );
    });
  });
}

// 点击auto执行它
async function clickAuto() {
  // 判断值是否为空，有输入值才执行
  if (props.autoValue) {
    // 对输入的值进行一个循环
    // 这里没有限制输入次数的最大值，需要进行限制
    for (let i = 0; i < props.autoValue; i++) {
      /*
       *点击开始
       *第一次点击，不重置数据，往后重置数据
       *进行移动多少px
       *执行到最后一列，显示出页面的内容
       *显示所有内容之后返回resolve
       */
      //   await spin();
      await clickMove();
    }
  } else {
    // 点击auto键且autoValue值为空才执行
    throw new Error("你并没有传入自动执行值，自动开始次数，不能调用此方法");
  }
}

//导入
const props = defineProps([
  "slotSymbols",
  "transitionDelay",
  "moveTop",
  "transitionDuration",
  "autoValue",
]);

//导出
defineExpose({
  clickMove,
  clickAuto,
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  height: 100%;
}

.slotcontainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}

.slot {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  margin-left: 8px;
  margin-right: 8px;
}

.slot .symbols {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0px;
  transition: top;
  width: 98%;
  height: 100%;
}

.slot .symbol {
  width: 99%;
  height: 18.3%;
  font-size: 30px;
  line-height: 100px;
  text-align: center;
  border: solid 1px red;
  margin-top: 10px;
  margin-bottom: 10px;
}

@keyframes scroll {
  100% {
    /* 需要滚动内容的总高度 */
    top: -1352px;
  }
}
</style>

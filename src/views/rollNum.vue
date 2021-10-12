<template>
  <div class="rollNum-main">
    <ul>
      <!-- 需要显示6列 -->
      <li ref="li" v-for="i in 8" :key="i">
        <!-- 每列中的10行数字 -->
        <span v-for="num in 10" :key="num">{{ num - 1 }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RollNum",
  components: {},
  props: {
    num: {
      type: String,
      default: "200",
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    setTimeout(() => {
      this.toOrderNum(this.num, this.$refs.li);
    },500);
    
  },
  mounted() {},
  watch: {},

  methods: {
    // 处理数字
    toOrderNum(num, el) {
      num = num.toString();
      // 把数变成字符串
      if (num.length < 8) {
        num = "0" + num; // 如未满八位数，添加"0"补位
        this.toOrderNum(num, el); // 递归添加"0"补位
      } else if (num.length === 8) {
        const numArr = num.split(""); // 将其便变成数据，渲染至滚动数组
        el.forEach((item, index) => {
          let ty = numArr[index];
          item.style.transform = `translate(0%, -${ty * 100}%)`;
        });
      } else {
        this.$message.warning("数字过大，显示异常，请联系客服");
      }
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  justify-content: center;
  overflow: hidden;
  li {
    width: 40px;
    height: 70px;
    flex-direction: column;
    transition: transform 1s ease-in-out;
    list-style-type: none;
    margin-left: 5px;
    span {
      text-align: center;
      background-color: #004985;
      color: #61c2f3;
      font-family: electronicFont;
      font-size: 12px;
      display: flex;
      display: inline-block;
      width: 100%;
      border-radius: 5px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2.5vw;
    }
  }
}
</style>

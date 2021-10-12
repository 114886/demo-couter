<template>
  <div class="chartNum">
    <div class="box-item">
      <li
        :class="{ 'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
        v-for="(item, index) in orderNum"
        :key="index"
      >
        <span v-if="!isNaN(item)">
          <i ref="numberItem">0123456789</i>
        </span>
        <span class="comma" v-else>{{ item }}</span>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total:192,
      orderNum: ["0", "0", ",", "0", "0", "0", ",", "0", "0", "0"], // 默认订单总数
    };
  },
  mounted() {
    this.getdata()
    this.$nextTick(() => {
      this.toOrderNum(this.total); // 这里输入数字即可调用
      this.setNumberTransform();
    });
  },
  methods: {
    getdata(){
      this.$axios
          .get("https://pre-api.coding-space.cn/order2110/common/index")
          .then((res) => {
            if (res.data) {
              // console.log(res.data.data);
              this.total=res.data.data.total
              this.toOrderNum(this.total); 
              this.setNumberTransform();
              // console.log(this.total);
            } else {
              alert("设备获取异常，请重新刷新获取数据！");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    // 设置文字滚动
    setNumberTransform() {
      const numberItems = this.$refs.numberItem; 
      const numberArr = this.orderNum.filter((item) => !isNaN(item));
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index];
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
      }
    },
    // 处理总订单数字
    toOrderNum(num) {
      num = num.toString();
      if (num.length < 8) {
        num = "0" + num; 
        this.toOrderNum(num); 
      } else if (num.length === 8) {
        num = num.slice(0, 2) + "," + num.slice(2, 5) + "," + num.slice(5, 8);
        this.orderNum = num.split(""); 
      } else {
        this.$message.warning("订单总量数字过大，显示异常，请联系客服");
      }
    },
  },
};
</script>
<style lang='scss' scoped >

.box-item {
  position: relative;
  height: 100px;
  font-size: 54px;
  line-height: 41px;
  text-align: center;
  list-style: none;
  color: #ffc72d;
  writing-mode: vertical-lr;
  text-orientation: upright;
  /*文字禁止编辑*/
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  /* overflow: hidden; */
}

.mark-item {
  width: 10px;
  height: 100px;
  margin-right: 5px;
  line-height: 10px;
  font-size: 48px;
  position: relative;
  & > span {
    position: absolute;
    width: 100%;
    bottom: 0;
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
}

.number-item {
  width: 41px;
  height: 75px;
  background: #ccc;
  list-style: none;
  margin-right: 5px;
  background: rgba(250, 250, 250, 1);
  border-radius: 4px;
  border: 1px solid rgba(221, 221, 221, 1);
  & > span {
    position: relative;
    display: inline-block;
    margin-right: 10px;
    width: 100%;
    height: 100%;
    writing-mode: vertical-rl;
    text-orientation: upright;
    overflow: hidden;
    & > i {
      font-style: normal;
      position: absolute;
      top: 11px;
      left: 50%;
      transform: translate(-50%, 0);
      transition: transform 1s ease-in-out;
      letter-spacing: 10px;
    }
  }
}
.number-item:last-child {
  margin-right: 0;
}
</style>
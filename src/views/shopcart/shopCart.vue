<template>
  <div id="shop-car">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <scroll class="wrapper" ref="scroll">
      <!--   购物车为空组件-->
      <van-empty
        v-show="length === 0"
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="购物车是空的哟！"
      />
      <!-- 购物车复选框组 -->
      <van-checkbox-group
        v-model="checkgroupList"
        ref="checkboxGroup"
        style="margin-bottom: 30px"
      >
        <div v-for="(item, index) in cardList" :key="index">
          <van-swipe-cell>
            <!-- 自己定义添加左侧复选框 -->
            <van-checkbox
              :name="item"
              checked-color="#9381ff"
              class="checkbox"
            ></van-checkbox>
            <van-card
              :price="item.price"
              :desc="item.desc"
              :title="item.title"
              style="margin: 5px; padding-left: 20px"
            >
              <!-- 计步器添加商品数量 -->
              <template #num>
                <van-stepper
                  v-model="item.count"
                  @change="onChange($event, item)"
                />
              </template>

              <template slot="thumb">
                <div class="item-img-checkbox">
                  <van-image
                    :src="item.image"
                    class="van-img"
                    width="88px"
                    height="88px"
                  ></van-image>
                </div>
              </template>
            </van-card>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="deleteShop(index)"
              />
            </template>
          </van-swipe-cell>
        </div>
      </van-checkbox-group>
    </scroll>
    <!-- 底部计算总价并提交组件 -->
    <van-submit-bar :price="totalPrice" class="submit">
      <template #button>
        <van-button round color="#9381ff">提交订单</van-button>
      </template>
      <van-checkbox
        @click="checkAll"
        v-model="isAllChecked"
        checked-color="#9381ff"
        :disabled="isNull"
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import { mapGetters, mapMutations } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import {
  Checkbox,
  CheckboxGroup,
  Card,
  SwipeCell,
  Button,
  Stepper,
  SubmitBar,
  Empty,
} from "vant";
import { Image as VanImage } from "vant";
export default {
  methods: {
    onChange($event, index) {
      // console.log($event);
      console.log(index);

      //  console.log(ind);
      this.changeCount(index);
      // this.$store.commit("changeCount",index);
    },
    //传到mutations,
    deleteShop(index) {
      console.log(index);
      this.del(index);
      this.checkgroupList.splice(index, 1);
    },
    //改变vuexlim商品数量
    //get 别人传递给他的值，
    //set 给别人设置的时候 newval为计算属性改变后的值
    //点击全选按钮
    checkAll() {
      //第一种实现方法利用vant checkbox toggle函数
      // 有商品卡片选中
      if (this.checkgroupList.length !== 0) {
        //当总商品数量与选中商品数量相等时，说明此时已经全选
        if (this.checkgroupList.length === this.length) {
          this.$refs.checkboxGroup.toggleAll(false);
        }
        //部分选中
        else {
          this.$refs.checkboxGroup.toggleAll(true);
        }
      }
      //没有选中
      else {
        this.$refs.checkboxGroup.toggleAll(true);
      }
      //第二种方法
      //   if(this.isAllChecked){
      //   this.checkgroupList = this.card
      // }else{
      //   this.checkgroupList = []
      // }
    },
    comtalPrice() {
      let totalPrice = 0;
      this.checkgroupList.map((item) => {
        totalPrice += item.price * item.count;
      });
      this.totalPrice = totalPrice * 100;
    },
    //辅助函数
    ...mapMutations(["del", "changeCount"]),
  },
  components: {
    Scroll,
    NavBar,
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Stepper.name]: Stepper,
    [SubmitBar.name]: SubmitBar,
    [VanImage.name]: VanImage,
    [Empty.name]: Empty,
  },
  data() {
    return {
      checkgroupList: [],
      cardList: this.$store.state.cardList,
      totalPrice: 0,
      value: "",
    };
  },
  computed: {
    // 判断isNull
    isNull() {
      if (this.cardList.length !== 0) {
        return false;
      } else {
        return true;
      }
    },

    //用计算属性判断全选状态
    isAllChecked() {
      if (this.checkgroupList.length === this.length && this.length !== 0) {
        return true;
      } else {
        return false;
      }
    },
    cardLength() {
      return this.$store.getters.getLength;
    },
    ...mapGetters(
      //two options
      {
        length: "getLength",
        card: "getCardList",
      }
    ),
  },
  watch: {
    //   cardList:{
    //     handler(list){
    //       console.log(list);
    //       if(list.length===0){
    //         isAllChecked=false;

    //       }

    //     },
    //     deep:true,

    //   }
    // ,
    checkgroupList: {
      handler(list) {
        // if(this.checkgroupList.length===this.cardList.length&&this.cardLength!==0){
        //   this.isAllChecked =true;
        // }
        // else{
        //   this.isAllChecked=false;
        // }
        this.comtalPrice();
      },
      deep: true,
      immediate: true,
    },
  },
  activated() {
    // console.log('------');
    this.$refs.scroll.refresh();
  },
};
</script>
<style scoped>
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
#shop-car {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #eee;
}
.wrapper {
  height: calc(100% - 48px - 99px);
  overflow: hidden;
}
.delete-button {
  height: 100%;
}
.submit {
  margin-bottom: 49px;
}
.checkbox {
  z-index: 9;
  position: absolute;
  align-items: center;
  text-align: center;
  margin-left: 5px;
  margin-top: 44px;
}
</style>
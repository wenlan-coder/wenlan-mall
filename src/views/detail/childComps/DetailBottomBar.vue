<template>
  <div class="bottom-nav">
      <van-goods-action>
  <van-goods-action-icon icon="chat-o" text="客服" color="blue" badge="5"/>
  <van-goods-action-icon icon="cart-o" text="购物车" />
  <van-goods-action-icon icon="star" text="已收藏" color="blue" />
  <van-goods-action-button color="#be99ff" type="warning" text="加入购物车"  @click="addCar"/>
  <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
</van-goods-action>
      
  </div>
</template>

<script>


import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
// Vue.use(GoodsAction);
// Vue.use(GoodsActionButton);
// Vue.use(GoodsActionIcon);
export default {
    components:{
      [GoodsAction.name]:GoodsAction,
      [GoodsActionIcon.name]:GoodsActionIcon,
      [GoodsActionButton.name]:GoodsActionButton
    },
    methods:{
      addCar(){
        // console.log("addcar");
        this.$emit("add-car")
      }

    }
    

}
</script>

<style>
.bottom-nav{
 background: blue;
 height: 49px;
 position:fixed;
 right: 0;
 left: 0;
 bottom: 0;
}

</style>
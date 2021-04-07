<template>
  <div class="shop-info">
      <div class="info-top">
          <img :src="shop.logo" alt="" class="info-img">
          <span class="title">{{shop.name}}</span>
      </div>
      <div class="info-middle">
          <div class="info-middle-left">
               <div class="info-sell">
                 <div class="sell-counts">
              {{shop.sells|sellCountFilter}}
          </div>
          <div class="sell-text">总销量</div>
          </div>
          <div class="info-goods">
              <div class="goods-count">
                  {{shop.goodsCount}}
              </div>
              <div class="goods-text">
                  全部宝贝
              </div>
          </div>
          </div>
          <div class="info-middle-right">
              <table cellspacing="5">
                  <tr v-for="(item,index) in shop.score" :key="index">
                      <td>{{item.name}}</td>
                      <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
                      <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter?'高':'低'}}</span></td>
                  </tr>
              </table>
             
          </div>

       
      </div>
      <div class="info-bottom">
          <a href="">
              <span>进店逛逛</span>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        shop:{
            type:Object,
            default() {
                return {
        
                }
            }
        }

    },
    filters:{
        sellCountFilter:function(value){
            if(value<10000) return value;
            else return (value/10000).toFixed(2)+'万'
        }
    }

}
</script>

<style>
.shop-info{
    padding-bottom:30px;
    box-shadow: 0px 1px 1px rgba(100,100,100,.2);
}
.info-top{
    display: flex;
    flex-direction: row;
    align-items: center;

}

.info-img{
    margin-top: 10px;
    margin-left: 15px;
    display: inline-block;
    width: 20%;
    border-radius:50px;
    border: 1px solid #eee;
}
.title{
    margin-left:10px ;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
}
.info-middle{
    display: flex;
}
.info-middle-right{
    flex: 1;
}
.info-middle-left{
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    padding: 15px;
    text-align: center;
}
.info-sell{
    flex: 1;
}
.info-goods{
    border-right:1px solid silver ;
    flex: 1;
}
.info-sell .sell-counts{
    font-size: 20px;
}
.info-sell .sell-text{
    font-size: 14px;
}
.info-goods .goods-count{
    font-size: 20px;
}
.info-goods .goods-text{
    font-size: 14px;
}
.info-middle-right .score{
    color: greenyellow;
}

.info-middle-right .score-better{
    color: red;
}
.info-middle-right .better{
    color: greenyellow;
}
.info-middle-right .better-more{
    color: red;
}
.info-middle-right table td{
    padding-right: 5px;
    
}
.info-bottom{
    margin-top:10px ;
    display: flex;
    justify-content: center;
}
.info-bottom a {
    background-color: #c9c8c7;
    padding:6px 30px ;
    border-radius:10% ;
}
</style>
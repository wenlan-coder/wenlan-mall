<template>
  <div v-if="Object.keys(goods).length!==0"  class="base-info">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
      </div>
      <div class="info-other">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[0].name}}</span>
      </div>
      <div class="info-service">
          <div>
              <img :src="goods.services[0].icon" alt="">
              <span>{{goods.services[0].name}}</span>
          </div>
           <div>
              <img :src="goods.services[1].icon" alt="">
              <span>{{goods.services[1].name}}</span>
          </div>
           <div>
              <img :src="goods.services[2].icon" alt="">
              <span>{{goods.services[2].name}}</span>
          </div>
          
          
          

      </div>
  </div>
</template>

<script>
export default {
    props:{
        goods:{
            type:Object,
            default:()=>{return {}}
           
    }
}
}
    
</script>

<style>
.base-info{
    font-family: initial;

}
.info-title{
    height: 79px;
    font-size: 18px;
    text-indent: 18px;
    line-height: 25px;
    font-weight: 50px;
    padding-top: 10px;
    text-overflow: ellipsis;
    
    
}
.info-price{
    height: 40px;
    display: flex;
}
.n-price{
    margin-left:20px ;
    color:#4361ee;
    left: 20px;
    font-style: inherit;
    font-size: 20px;
    width: 100px;
    line-height: 40px;
}
.o-price{
    align-items: flex-end;
    right: -20px;
    font-size: 14px;
    padding-top: 8px;
    line-height: 30px;
    text-decoration: line-through;
}
.discount{
      margin-left:20px;
      background-color: #4361ee;
      color: #fff;
      height: 30px;
      width: 60px;
      font-size: 14px;
      border-radius:17px ;
      line-height: 30px;
      text-align: center;
      align-items: center;
}
.info-other{
    margin-top:5px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color:#999;
    padding-bottom:7px;
    padding:4px;
    box-shadow: 0px 1px 1px rgba(100,100,100,.2);
}
.info-service{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height:60px;
    font-size: 14px;
    box-shadow: 0px 1px 1px rgba(100,100,100,.2);
 
}
.info-service img{
    width: 20.8px;
    vertical-align: sub;
}


</style>
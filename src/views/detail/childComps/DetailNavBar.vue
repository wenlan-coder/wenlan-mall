<template>
  <div>
  <nav-bar>
    <div slot="left" class="back" @click="backHome"><img src="~assets/img/common/back.svg" alt=""></div>
    <div slot="center" class="titles">
    <div  @click="titleClick(index)" v-for="(item,index) in titles" :key="index"  class="title-item" :class="{active:index===currentIndex}">{{item}}</div>
  </div>
  </nav-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components:{
    NavBar,
  },
  data(){
    return{
      titles:['商品','参数','评论','讨论'],
      currentIndex:0,
    }
  },
  methods:{
    titleClick(index){
    // console.log(index);
    this.currentIndex=index
    },
    backHome(){
      this.$router.back()
    }
  }
}
</script>

<style>
.titles{
  display: flex;
  font-size: 16px;
  color:#666;
  justify-content: space-around;
}
.titles-item{
  flex: 1;

  
}
.active{
  color: blue;
}
.back{

  padding-top:5px ;
}
</style>
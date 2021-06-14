<template>
  <div v-if="Object.keys(comment).length !== 0" class="comment-info">
    <div class="info-comment">
      <div class="header-info">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right">></i>
      </div>
      <div class="info"></div>
    </div>
    <div class="info-user">
      <img :src="comment.user.avatar" alt="" />
      {{ comment.user.uname }}
    </div>
    <div class="info-detail">
      <p>{{ comment.content }}</p>
      <div class="info-date">{{comment.created|dateFormat}}</div>
      <span>{{comment.style}}</span>
    </div>
    <div class="info-imgs">
        <img :src="item" alt="" v-for="(item,index) in comment.images" :key="index">
    </div>
  </div>
</template>

<script>
import {format,add0} from '@/common/utils.js'
export default {
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods:{
//   formatDate() { 
// let year=now.getFullYear();  //取得4位数的年份
// let month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
// let date=now.getDate();      //返回日期月份中的天数（1到31）
// let hour=now.getHours();     //返回日期中的小时数（0到23）
// let minute=now.getMinutes(); //返回日期中的分钟数（0到59）
// let second=now.getSeconds(); //返回日期中的秒数（0到59）
// return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
// }
//   }
// };
  },
  filters:{
  date:function(value){
      return format(value)
  }
}
}
</script>

<style>
.comment-info {
  padding: 10px 15px;
  border-bottom: 5px solid #f2f4f8;
}
.info-comment {
  margin-bottom: 20px;
  position: relative;
  height: 46px;
  font-size: 18px;
  border-bottom: 3px solid #f2f4f8;
  align-items: center;
  text-align: center;
  padding: 10px;
}
.header-info {
  color: black;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  align-items: center;
  float: left;
}
.header-more {
  float: right;
  align-items: center;
}
.info-user {
  align-items: center;
  height: 48px;
  font-size: 18px;
  display: flex;
  color: #3a86ff;
}
.info-user img {
  padding-right: 10px;
  height: 43px;
  border-radius: 50%;
  align-items: center;
}
.info-detail p{
  padding: 15px 0;
}
.info-imgs{
    padding-top:5px;
    align-items: flex-start;

    }
.info-imgs img{
    flex-grow: 1;
    flex-shrink: 1;
    padding: 5px  5px 0 2.5px;
    width: 33.33%;
    height: 127px;
}
</style>
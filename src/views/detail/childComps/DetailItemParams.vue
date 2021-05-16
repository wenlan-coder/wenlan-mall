<template>
  <div class="params-info" v-if="Object.keys(detailParams).length !==0">
  <table v-for="(table,index) in detailParams.rule.tables" :key="index" class="info-size">
      <tr v-for="(tr,index1) in table" :key="index1">
          <td v-for="(td,index2) in tr" :key="index2">{{td}}</td>
      </tr>
  </table>
  <table class="table-second" >
      <tr v-for="(info,index) in detailParams.info.set" :key="index" >
          <td class="info-params-key">{{info.key}}</td>
          <td class="params-value">{{info.value}}</td>
      </tr>
  </table>
  <div class="info-img" v-if="detailParams.info.images">
      <img :src="detailParams.info.image[0]" alt="">
  </div>
  </div>
</template>

<script>
export default {
  props: {
    detailParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.params-info{
    padding: 20px 15px;
    font-size: 18px;
    border-bottom: 5px solid #f2f4f8;
}
.params-info table{
    width: 100%;
    border-collapse:collapse ;
}
.params-info table tr{
    height: 42px;
    
}
.params-info table tr td{
    text-align: center;
    padding: auto;
    border-bottom: 1px solid rgba(100,100,100,.1);
}
.table-second{
     width: 100%;
    border-collapse:collapse;
}
/* .table-second tr{
    height:px;

} */
.table-second .info-params-key{
    text-align: center;
    padding: auto;
    margin: 0 5px;
    white-space: nowrap;
    font-size: 18px;

}

.params-value{
    text-align: center;
    align-items: center;
    font-size: 18px;
    padding: 10px 10px;
    word-wrap: break-word;
    margin: 0 5px;
    color: #3a86ff;
    

}
</style>
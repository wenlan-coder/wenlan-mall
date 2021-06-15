import Vue from 'vue'
import Vuex from 'vuex'
//import vuex 存储插件
import VuexPersist from 'vuex-persist'
//安装插件
Vue.use(Vuex)
//创建store对象
//导入
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
const state = {
    cardList:[],
}
const store =new Vuex.Store({
    module:{
    },
    getters,
    state,
    //mutations里面不改写逻辑代码，异步代码，只写简单逻辑赋值代码
    //唯一目的就是修改state里面状态，每个方法完成事件金可能单一
    mutations,
    //业务逻辑代码，异步代码都在actions
    actions,
    plugins: [
        new VuexPersist({
           storage: window.localStorage,
        }).plugin,
     ]

})
//挂在到vue实例上
export default store
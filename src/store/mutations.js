import {
  ADD_CART,
  ADD_COUNT
} from './mutation-types'
//mutations里面不改写逻辑代码，异步代码，只写简单逻辑赋值代码
//唯一目的就是修改state里面状态，每个方法完成事件金可能单一
export default {
  //增加数量
  [ADD_COUNT](state, payload) {
    payload.count += 1;
  },
  //添加到购物车
  [ADD_CART](state, payload) {
    state.cardList.push(payload)
  },
  //delete shop
  del(state, index) {
    console.log(index);
    state.cardList.splice(index, 1);
  },
  //改变商品数量
  changeCount(state, index) {
    console.log(index);
    let ind = state.cardList.findIndex((item) => {
      return item.iid === index.iid
    });
    console.log(ind);
    //  console.log(state.cardList);
    //  state.cartList[ind].count=index.count;
    //  console.log(state.cardList[ind].count);
    // console.log(index.count);
  },
}

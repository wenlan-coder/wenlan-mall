import {ADD_CART,ADD_COUNT} from './mutation-types'
export default {
    addCart(context,payload){
        //1 some方法
        // var flag = false;
        // // 默认第一次,进来就遍历一遍,当遍历到相同的就count相加

        // state.cardList.some(item => { 
        //         if (item.iid === payload.iid) {
        //             item.count+=1;
        //             flag = true;
        //             return true;
        //         }
        //     })

        // if (!flag) { //如果取非为真,则flase的值是假(判断flag值为假)
        //     // payload.count=1;
        //     // state.cardList.push(payload);
        //     state.cardList.push({...payload,count:1})
        // }

        // 2 for循环payload添加新商品方法
        // var flag=false;
        // for(let item of state.cardList){ 
        //     //判断cardlist是否有新增一样的
        //     if(item.iid===payload.iid){
        //         item.count+=1;
        //         flag=true;
       
        //     }
        // }
        //     //没有找到
        //     if(!flag){
        //         payload.count=1;
        //         state.cardList.push(payload)
        //     } 
            
        
        /// 3 indexof方法
        // let index = state.cardList.indexOf(payload);
        // if(index===-1){
        //     let oldProduct =state.cardList[index];
        //     oldProduct.count+=1;
        // }
        // else{
        //     payload.count=1;
        //     state.cardList.push(payload)
        // }

        //4 es6新增find方法 
        let oldProduct = context.state.cardList.find(item=>item.iid===payload.iid)
        if(oldProduct){
            context.commit(ADD_COUNT,oldProduct);
        }
        else{
            payload.count=1;
            context.commit(ADD_CART,payload)
        }
        //当然还有findindex等等方法
}
}
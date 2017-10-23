import {combineReducers} from "redux";
import counter from './reducers/counter';
import userInfo from './reducers/userInfo';

/*调用store.dispatch(action)提交action。
*redux store调用传入的reducer函数。把当前的state和action传进去。
*根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
*Redux store 保存了根 reducer 返回的完整 state 树。*/
// export default function combineReducers(state = {}, action){
//   return {
//     counter: counter(state.counter, action),
//     userInfo: userInfo(state.userInfo, action)
//   }
// }

export default combineReducers({
  counter,
  userInfo
});

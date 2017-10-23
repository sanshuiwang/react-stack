export const GET_USER_INFO_REQUEST = "userInfo/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "userInfo/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "userInfo/GET_USER_INFO_FAIL";

function getUserInfoRequest() {
  return {type: GET_USER_INFO_REQUEST}
}

function getUserInfoSuccess(userInfo){
  return {type: GET_USER_INFO_SUCCESS, userInfo: userInfo}
}

function getUserInfoFail() {
  return{type: GET_USER_INFO_FAIL}
}

/*我们现在的这个action创建函数 getUserInfo则是返回函数了。
*为了让action创建函数除了返回action对象外，还可以返回函数，我们需要引用redux-thunk中间件。*/
/*函数形式的action，把他们转为标准的action给reducer。这是redux-thunk的作用。*/
// export function getUserInfo(){
//   return function (dispatch){
//     dispatch(getUserInfoRequest);
//
//     return fetch('http://localhost:8080/api/user.json')
//       .then((response => {
//         return response.json()
//       }))
//       .then((json) => {
//         dispatch(getUserInfoSuccess(json))
//       })
//       .catch(
//         () => {
//           dispatch(getUserInfoFail());
//         }
//       )
//   }
// }

export function getUserInfo(){
  return {
    types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
    promise: client => client.get(`http://localhost:8080/api/user.json`)
  }
}

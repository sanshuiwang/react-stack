import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from '../../redux/actions/userInfo';

class UserInfo extends Component {
  render() {
    const {userInfo,isLoading,errorMsg} = this.props.userInfo;
    return(
      <div>
        {
          isLoading ? '请求信息中......' :
            (
              errorMsg ? errorMsg :
                <div>
                  <p>用户信息</p>
                  <p>用户名：{userInfo.name}</p>
                  <p>介绍：{userInfo.intro}</p>
                </div>
            )
        }
        <button onClick={() => this.props.getUserInfo()}>请求用户信息</button>
      </div>
    )
  }
}

/*这里你可能发现connect参数写法不一样了，mapStateToProps函数用了es6简写，mapDispatchToProps用了react-redux提供的简单写法。*/
export default connect((state) => ({userInfo: state.userInfo}),{getUserInfo})(UserInfo);

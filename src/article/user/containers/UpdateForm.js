import UserUpdateForm from '../components/UpdateForm';
import {connect} from 'react-redux';

export default connect(state => {
  return {
    logined_id: state.logined_id,
    logined_nickname: state._logined_nickname
  }
}, dispatch => {
  return {
    onSubmit: function(id, nickname, pwd, history) {
      fetch('/users/update', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          nickname: nickname,
          pwd: pwd
        })
      }).then(res => {
        res.json().then(json => {
          if (json.result) {
            dispatch({
              type: 'UPDATED_NICKNAME',
              nickname: nickname
            });
            history.goBack();
          }
          alert(json.message);
        })
      })
    },
    onChange: function(value) {
      dispatch({
        type: 'UPDATE_NICKNAME',
        nickname: value
      })
    }
  }
})(UserUpdateForm)

import {connect} from 'react-redux';
import LoginForm from '../components/LoginForm';

export default connect(null, dispatch => {
  return {
    onSubmit: function(email, pwd, history) {
      fetch('/users/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          pwd: pwd
        })
      }).then(res => {
        res.json().then(json => {
          if (json.result) {
            dispatch({
              type: 'LOGINED',
              nickname: json.nickname,
              id: json.id
            })
          } else {
            alert(json.message)
          }
          if (json.logined) {
            history.goBack();
          }
        })
      })
    }
  }
})(LoginForm);

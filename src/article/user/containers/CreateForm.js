import UserCreateForm from '../components/CreateForm';
import {connect} from 'react-redux';

export default connect(null, dispatch => {
  return {
    onSubmit: function(email, pwd, nickname, history) {
      fetch('/users/create', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          pwd: pwd,
          nickname: nickname
        })
      }).then(res => {
        res.json().then(json => {
          dispatch({
            type: 'CREATE_USER',
            user: json.user
          })
          alert(json.message)
          history.replace('/users')
        })
      })
    }
  }
})(UserCreateForm);

import {connect} from 'react-redux'
import Login from '../components/Login'

function mapStateToProps(state) {
  return {
    logined_id: state.logined_id,
    logined_nickname: state.logined_nickname
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: function() {
      fetch('/users/logout').then(res => {
        res.json().then(json => {
          dispatch({
            type: 'LOGOUTED'
          });
          alert(json.message);
        })
      })
    },
    delete: function(id, history) {
      fetch('/users/delete', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      }).then(res => {
        res.json().then(json => {
          if (json.result) {
            dispatch({
              type: 'DELETED_USER'
            })
            history.push('/users')
          }
          alert(json.message)
        })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

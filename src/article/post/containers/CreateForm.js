import {connect} from 'react-redux';
import CreateForm from '../components/CreateForm'

export default connect(state => {
  return {
    logined_id: state.logined_id
  }
}, dispatch => {
  return {
    onSubmit: function(title, desc, history, logined_id) {
      if (!logined_id) {
        history.push('/login')
      } else {
        fetch('/posts/create', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: title,
            desc: desc
          })
        }).then(res => {
          res.json().then(json => {
            if (json.result) {
              dispatch({
                type: 'CREATE_POST',
                posts: json.posts
              })
              history.push('/posts')
            } else {
              history.push('/login')
            }
          })
        })
      }
    }
  }
})(CreateForm)

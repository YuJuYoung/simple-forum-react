import {connect} from 'react-redux';
import UpdateForm from '../components/UpdateForm';

export default connect(state => {
  return {
    post: state._selected_post
  }
}, dispatch => {
  return {
    setPost: function(postId) {
      fetch('/posts/' + postId).then(res => {
        res.json().then(json => {
          dispatch({
            type: 'SET_POST',
            selected_post: json
          })
        })
      })
    },
    changeTitle: function(value) {
      dispatch({
        type: 'SET_POST_TITLE',
        title: value
      })
    },
    changeDesc: function(value) {
      dispatch({
        type: 'SET_POST_DESC',
        desc: value
      })
    },
    onSubmit: function(post, history) {
      fetch('/posts/update/' + post.id, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: post.title,
          desc: post.desc,
          userId: post.userId
        })
      }).then(res => {
        res.json().then(json => {
          if (json.result) {
            dispatch({
              type: 'UPDATE_POST',
              post: json.post
            })
            history.push('/posts/' + post.id)
          } else {
            alert(json.message)
          }
        })
      })
    },
    removePost: function() {
      dispatch({
        type: 'REMOVE_SELECTED_POST'
      })
    }
  }
})(UpdateForm)

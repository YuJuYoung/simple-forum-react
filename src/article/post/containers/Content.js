import {connect} from 'react-redux';
import Content from '../components/Content';

export default connect(state => {
  return {
    logined_id: state.logined_id,
    post: state.selected_post,
    update: function(userId, history, _url) {
      fetch('/posts/update', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId
        })
      }).then(res => {
        res.json().then(json => {
          if (json.result) {
            history.push(_url)
          } else {
            history.push('/login')
          }
        })
      })
    }
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
    removePost: function() {
      dispatch({
        type: 'REMOVE_SELECTED_POST'
      })
    },
    delete: function(postId, post, history) {
      fetch('/posts/delete', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId: postId,
          userId: post.userId
        })
      }).then(res => {
        res.json().then(json => {
          if (json.result) {
            dispatch({
              type: 'DELETED_POST',
              postId: postId
            })
            history.push('/posts')
          } else {
            alert(json.message)
          }
        })
      })
    }
  }
})(Content);

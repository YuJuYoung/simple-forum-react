import {connect} from 'react-redux';
import Comment from '../components/Comment'

const LIMIT = 5;

export default connect(state => {
  return {
    logined_id: state.logined_id,
    update_comment: state.selected_update_comment,
    comments: state.selected_post_comments,
    commentListIndex: state.commentListIndex
  }
}, dispatch => {
  return {
    setComments: function(postId) {
      dispatch({
        type: 'SET_COMMENTS',
        postId: postId
      })
    },
    setInitIndex: function() {
      dispatch({
        type: 'SET_INIT_COMMENT_LIST_INDEX'
      })
    },
    increaseIndex: function() {
      dispatch({
        type: 'INCREASE_COMMENT_LIST_INDEX',
        limit: LIMIT
      })
    },
    decreaseIndex: function() {
      dispatch({
        type: 'DECREASE_COMMENT_LIST_INDEX',
        limit: LIMIT
      })
    },
    onSubmit: function(postId, content, history) {
      fetch('/comments/create', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId: postId,
          content: content
        })
      }).then(res => {
        res.json().then(json => {
          if (!json.result) {
            history.push('/login')
          } else {
            dispatch({
              type: 'SET_COMMENTS',
              postId: postId
            })
            alert('성공')
          }
        })
      })
    },
    removeCommentState: function() {
      dispatch({
        type: 'REMOVE_COMMENT_STATE'
      })
    },
    onUpdate: function(comment) {
      dispatch({
        type: 'SET_UPDATE_COMMENT',
        comment: Object.assign({}, comment)
      })
    },
    onDelete: function(comment) {
      fetch('/comments/delete', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      }).then(res => {
        res.json().then(json => {
          if (json.result) {
            dispatch({
              type: 'DELETED_COMMENT',
              commentId: comment.id
            })
          } else {
            alert(json.message)
          }
        })
      })
    }
  }
})(Comment)

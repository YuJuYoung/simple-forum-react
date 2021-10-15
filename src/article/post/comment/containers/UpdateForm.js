import {connect} from 'react-redux';
import UpdateForm from '../components/UpdateForm'

export default connect(state => {
  return {
    comment: state.selected_update_comment
  }
}, dispatch => {
  return {
    onChange: function(value) {
      dispatch({
        type: 'CHANGED_COMMENT_CONTENT',
        value: value
      })
    },
    onSubmit: function(comment) {
      fetch('/comments/update', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      }).then(res => {
        res.json().then(json => {
          if (json.result) {
            dispatch({
              type: 'UPDATED_COMMENT',
              comment: comment
            })
            dispatch({
              type: 'REMOVE_SELECTED_COMMENT_STATE'
            })
          } else {
            alert(json.message)
          }
        })
      })
    },
    removeState: function() {
      dispatch({
        type: 'REMOVE_SELECTED_COMMENT_STATE'
      })
    }
  }
})(UpdateForm)

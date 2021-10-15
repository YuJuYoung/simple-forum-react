import {connect} from 'react-redux';
import List from '../components/List'

const LIMIT = 10;

export default connect(state => {
  return {
    logined_id: state.logined_id,
    posts: state.posts,
    postListIndex: state.postListIndex,
    onClick: function(history, logined_id) {
      if (!logined_id) {
        history.push('/login')
      } else {
        fetch('/posts/create').then(res => {
          res.json().then(json => {
            if (json.result) {
              history.push('/posts/create')
            } else {
              history.push('/login')
            }
          })
        })
      }
    }
  }
}, dispatch => {
  return {
    setInitIndex: function() {
      dispatch({
        type: 'SET_INIT_POST_LIST_INDEX'
      })
    },
    increaseIndex: function() {
      dispatch({
        type: 'INCREASE_POST_LIST_INDEX',
        limit: LIMIT
      })
    },
    decreaseIndex: function() {
      dispatch({
        type: 'DECREASE_POST_LIST_INDEX',
        limit: LIMIT
      })
    }
  }
})(List);

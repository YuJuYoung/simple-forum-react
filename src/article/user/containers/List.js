import UserList from '../components/List';
import {connect} from 'react-redux';

const LIMIT = 10;

function mapStateToProps(state) {
  return {
    users: state.users,
    logined_id: state.logined_id,
    userListIndex: state.userListIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setInitIndex: function() {
      dispatch({
        type: 'SET_INIT_USER_LIST_INDEX'
      })
    },
    increaseIndex: function() {
      dispatch({
        type: 'INCREASE_USER_LIST_INDEX',
        limit: LIMIT
      })
    },
    decreaseIndex: function() {
      dispatch({
        type: 'DECREASE_USER_LIST_INDEX',
        limit: LIMIT
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

import {createStore} from 'redux';
import syncFetch from 'sync-fetch';

export default createStore((state, action) => {
  if (state === undefined) {
    var users = syncFetch('/users').json();
    var loginState = syncFetch('/users/logined').json();
    var posts = syncFetch('/posts').json();
    var contents = syncFetch('/contents').json();

    return {
      users: users,
      userListIndex: 0,
      posts: posts,
      postListIndex: 0,
      contents: contents,
      selected_post: null,
      _selected_post: null,
      selected_post_comments: null,
      selected_update_comment: null,
      commentListIndex: 0,
      logined_nickname: loginState.logined_nickname,
      logined_id: loginState.logined_id,
      _logined_nickname: loginState.logined_nickname
    }
  }
  if (action.type === 'LOGINED') {
    return {
      ...state,
      logined_id: action.id,
      logined_nickname: action.nickname,
      _logined_nickname: action.nickname
    }
  } else if (action.type === 'LOGOUTED') {
    return {
      ...state,
      logined_id: null,
      logined_nickname: null
    }
  } else if (action.type === 'CREATE_USER') {
    return {
      ...state,
      users: state.users.concat(action.user)
    }
  } else if (action.type === 'UPDATE_NICKNAME') {
    return {
      ...state,
      _logined_nickname: action.nickname
    }
  } else if (action.type === 'UPDATED_NICKNAME') {
    return {
      ...state,
      logined_nickname: action.nickname
    }
  } else if (action.type === 'DELETED_USER') {
    var _users = state.users.slice();

    for (var i = 0; i < _users.length; i++) {
      if (state.logined_id === _users[i].id) {
        _users.splice(i, 1);
        break;
      }
    }
    return {
      ...state,
      logined_id: null,
      logined_nickname: null,
      users: _users,
      posts: syncFetch('/posts').json()
    }
  } else if (action.type === 'SET_POST') {
    return {
      ...state,
      selected_post: action.selected_post,
      _selected_post: action.selected_post,
    }
  } else if (action.type === 'CREATE_POST') {
    return {
      ...state,
      posts: action.posts
    }
  } else if (action.type === 'SET_POST_TITLE') {
    return {
      ...state,
      _selected_post: {
        ...state._selected_post,
        title: action.title
      }
    }
  } else if (action.type === 'SET_POST_DESC') {
    return {
      ...state,
      _selected_post: {
        ...state._selected_post,
        desc: action.desc
      }
    }
  } else if (action.type === 'UPDATE_POST') {
    var _posts = state.posts.slice();

    for (i = 0; i < _posts.length; i++) {
      if (_posts[i].id === action.post.id) {
        _posts[i] = action.post;
        break;
      }
    }

    return {
      ...state,
      selected_post: action.post,
      _selected_post: action.post,
      posts: _posts
    }
  } else if (action.type === 'REMOVE_SELECTED_POST') {
    return {
      ...state,
      selected_post: null,
      _selected_post: null,
      selected_post_comments: null
    }
  } else if (action.type === 'DELETED_POST') {
    _posts = state.posts.slice();

    for (i = 0; i < _posts.length; i++) {
      if (_posts[i].id === action.postId) {
        _posts.splice(i, 1);
        break;
      }
    }

    return {
      ...state,
      posts: _posts
    }
  } else if (action.type === 'SET_INIT_USER_LIST_INDEX') {
    return {
      ...state,
      userListIndex: 0
    }
  } else if (action.type === 'INCREASE_USER_LIST_INDEX') {
    return {
      ...state,
      userListIndex: state.userListIndex + action.limit
    }
  } else if (action.type === 'DECREASE_USER_LIST_INDEX') {
    return {
      ...state,
      userListIndex: state.userListIndex - action.limit
    }
  } else if (action.type === 'SET_INIT_POST_LIST_INDEX') {
    return {
      ...state,
      postListIndex: 0
    }
  } else if (action.type === 'INCREASE_POST_LIST_INDEX') {
    return {
      ...state,
      postListIndex: state.postListIndex + action.limit
    }
  } else if (action.type === 'DECREASE_POST_LIST_INDEX') {
    return {
      ...state,
      postListIndex: state.postListIndex - action.limit
    }
  } else if (action.type === 'SET_INIT_COMMENT_LIST_INDEX') {
    return {
      ...state,
      commentListIndex: 0
    }
  } else if (action.type === 'INCREASE_COMMENT_LIST_INDEX') {
    return {
      ...state,
      commentListIndex: state.commentListIndex + action.limit
    }
  } else if (action.type === 'DECREASE_COMMENT_LIST_INDEX') {
    return {
      ...state,
      commentListIndex: state.commentListIndex - action.limit
    }
  } else if (action.type === 'SET_COMMENTS') {
    return {
      ...state,
      selected_post_comments: syncFetch('/comments/' + action.postId).json()
    }
  } else if (action.type === 'REMOVE_COMMENT_STATE') {
    return {
      ...state,
      selected_post_comments: null
    }
  } else if (action.type === 'SET_UPDATE_COMMENT') {
    return {
      ...state,
      selected_update_comment: action.comment
    }
  } else if (action.type === 'CHANGED_COMMENT_CONTENT') {
    return {
      ...state,
      selected_update_comment: {
        ...state.selected_update_comment,
        content: action.value
      }
    }
  } else if (action.type === 'REMOVE_SELECTED_COMMENT_STATE') {
    return {
      ...state,
      selected_update_comment: null
    }
  } else if (action.type === 'UPDATED_COMMENT') {
    if (!state.selected_post_comments) {
      return state;
    }
    var _comments = state.selected_post_comments.slice();

    for (var i = 0; i < _comments.length; i++) {
      if (_comments[i].id === action.comment.id) {
        _comments[i] = action.comment;
        break;
      }
    }
    return {
      ...state,
      selected_post_comments: _comments
    }
  } else if (action.type === 'DELETED_COMMENT') {
    _comments = state.selected_post_comments.slice();

    for (var i = 0; i < _comments.length; i++) {
      if (_comments[i].id === action.commentId) {
        _comments.splice(i, 1);
        break;
      }
    }
    return {
      ...state,
      selected_post_comments: _comments
    }
  }
  return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

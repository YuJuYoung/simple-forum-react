import {Link} from 'react-router-dom';
import {useEffect} from 'react';

function getList(users, userListIndex) {
  var list = [];

  for (var i = userListIndex; i < users.length && i < userListIndex + 10; i++) {
    list.push(<li key={users[i].id}>{users[i].nickname}</li>)
  }
  return list
}

export default function UserList(props) {
  var users = props.users;
  var userListIndex = props.userListIndex;

  useEffect(() => {
    props.setInitIndex()
  }, [])

  return (
    <div className="list">
      <Link to="/users/create">계정 생성</Link>
      <ul>{getList(users, userListIndex)}</ul>
      {userListIndex === 0 ? null : <input type="button" value="이전" onClick={e => props.decreaseIndex()}/>}
      {userListIndex + 10 >= users.length ? null : <input type="button" value="다음" onClick={e => props.increaseIndex()}/>}
    </div>
  )
}

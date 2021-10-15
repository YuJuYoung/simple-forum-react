import {useHistory, NavLink} from 'react-router-dom';

export default function Login(props) {
  var history = useHistory();

  var loginedTag = (
    <p>
      {props.logined_nickname}<br/>
      <NavLink to={"/users/update/" + props.logined_id}>수정</NavLink><br/>
      <input type="button" onClick={e => props.delete(props.logined_id, history)} value="삭제"/>
      <input type="button" onClick={props.logout} value="로그아웃"/>
    </p>
  )
  var logoutedTag = <p><NavLink to="/login">로그인</NavLink></p>

  return (
    <div className="login">
      {props.logined_nickname ? loginedTag : logoutedTag}
    </div>
  )
}

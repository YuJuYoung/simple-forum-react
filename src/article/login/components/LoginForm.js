import {useHistory} from 'react-router-dom';

export default function LoginForm(props) {
  var history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    var email = e.target.email.value;
    var pwd = e.target.pwd.value;
    props.onSubmit(email, pwd, history)
  }

  return (
    <div className="loginForm">
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" name="email" placeholder="이메일"/>
        <p>
          <input type="password" name="pwd" placeholder="비밀번호"/>
        </p>
        <p>
          <input type="submit" value="로그인"/>
        </p>
      </form>
    </div>
  )
}

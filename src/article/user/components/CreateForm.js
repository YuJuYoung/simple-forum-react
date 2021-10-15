import {useHistory} from 'react-router-dom';

export default function UserCreateForm(props) {
  var history = useHistory();

  function handelSubmit(e) {
    e.preventDefault();
    props.onSubmit(
      e.target.email.value,
      e.target.pwd.value,
      e.target.nickname.value,
      history
    );
  }

  return (
    <div className="createUser">
      <form onSubmit={e => handelSubmit(e)}>
        <input type="text" name="email" placeholder="이메일"/>
        <p>
          <input type="password" name="pwd" placeholder="비밀번호"/>
        </p>
        <p>
          <input type="text" name="nickname" placeholder="닉네임"/>
        </p>
        <p>
          <input type="submit" value="생성"/>
        </p>
      </form>
    </div>
  )
}

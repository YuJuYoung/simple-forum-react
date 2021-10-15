import {useHistory} from 'react-router-dom';

export default function UserUpdateForm(props) {
  var id = props.logined_id;
  var nickname = props.logined_nickname;
  var history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(id, nickname, e.target.pwd.value, history);
  }

  return (
    <div className="updateUser">
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" name="nickname" placeholder="닉네임" value={nickname} onChange={e => props.onChange(e.target.value)}/>
        <p>
          <input type="password" name="pwd" placeholder="기존 비밀번호"/>
        </p>
        <p>
          <input type="submit" value="수정"/>
        </p>
      </form>
    </div>
  )
}

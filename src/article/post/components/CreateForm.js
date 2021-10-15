import {useHistory} from 'react-router-dom';

export default function CreateForm(props) {
  var history = useHistory();

  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit(
      e.target.title.value,
      e.target.desc.value,
      history,
      props.logined_id
    )
  }

  return (
    <div className="update">
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" name="title" placeholder="제목"/>
        <p>
          <textarea name="desc" placeholder="내용"></textarea>
        </p>
        <p>
          <input type="submit" value="create"/>
        </p>
      </form>
    </div>
  )
}

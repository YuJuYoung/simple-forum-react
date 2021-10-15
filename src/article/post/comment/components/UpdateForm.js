import {useEffect} from 'react';

export default function UpdateForm(props) {
  var comment = props.comment;

  useEffect(() => {
    return () => {
      props.removeState()
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit(comment)
  }

  return (
    <div className="comment-update">
      <form onSubmit={e => handleSubmit(e)}>
        <p><textarea name="content" placeholder="내용" value={comment.content} onChange={
          e => props.onChange(e.target.value)
        }></textarea></p>
        <p><input type="submit" value="제출"/></p>
      </form>
    </div>
  )
}

import {useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import UpdateForm from '../containers/UpdateForm';

function getUpdateDeleteTag(comment, props) {
  return (
    <div className="update-delete">
      <input type="button" value="수정" onClick={e => props.onUpdate(comment)}/>
      <input type="button" value="삭제" onClick={e => props.onDelete(comment)}/>
      {props.update_comment && comment.id === props.update_comment.id ? <UpdateForm /> : null}
    </div>
  )
}

function getList(comments, commentListIndex, props) {
  var list = [];

  for (var i = commentListIndex; i < comments.length && i < commentListIndex + 5; i++) {
    list.push(
      <li key={comments[i].id}>
        <p>{comments[i].nickname + ': ' + comments[i].content}</p>
        <p>{'최근 수정 날짜: ' + comments[i].updated}</p>
        {comments[i].userId === props.logined_id ? getUpdateDeleteTag(comments[i], props) : null}
      </li>
    )
  }
  return list
}

export default function Comment(props) {
  var params = useParams();
  var history = useHistory();

  var comments = props.comments;
  var commentListIndex = props.commentListIndex;

  useEffect(() => {
    props.setInitIndex()
    props.setComments(params.postId)
    return () => {
      props.removeCommentState()
    }
  }, [params.postId])

  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit(params.postId, e.target.content.value, history)
  }

  if (!comments) {
    return <div>Loading...</div>
  }
  return (
    <div className="comment-list">
      <ul>{getList(comments, commentListIndex, props)}</ul>
      <p className="comment-list-control">
        {commentListIndex === 0 ? null : <input type="button" value="이전" onClick={e => props.decreaseIndex()}/>}
        {commentListIndex + 5 >= comments.length ? null : <input type="button" value="다음" onClick={e => props.increaseIndex()}/>}
      </p>
      <form className="comment-create" onSubmit={e => handleSubmit(e)}>
        <p><textarea name="content" placeholder="댓글"></textarea></p>
        <p><input type="submit" value="create"/></p>
      </form>
    </div>
  )
}

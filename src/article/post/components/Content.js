import {useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Comment from '../comment/containers/Comment'

export default function Content(props) {
  var params = useParams();
  var history = useHistory();
  var post = props.post;

  useEffect(() => {
    props.setPost(params.postId)
    return () => {
      props.removePost()
    }
  }, [params.postId])

  function handleUpdate(userId, url) {
    props.update(userId, history, url)
  }

  if (!post) {
    return <div>Loading...</div>
  }
  return (
    <div className="content">
      <div className="title">{'제목: ' + post.title}</div>
      <p>{'내용: ' + post.desc}</p>
      <p>{'작성자: ' + post.userNickname}</p>
      <p>{'created: ' + post.created}</p>
      <p>
        <input type="button" onClick={e => handleUpdate(post.userId, "/posts/update/" + params.postId)} value="수정"/>
        <input type="button" onClick={e => props.delete(Number(params.postId), post, history)}value="삭제"/>
      </p>
      <Comment />
    </div>
  )
}

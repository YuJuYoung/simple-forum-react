import {useParams, useHistory} from 'react-router-dom';
import {useEffect} from 'react';

export default function UpdateForm(props) {
  var params = useParams();
  var history = useHistory();
  var post = props.post;

  useEffect(() => {
    props.setPost(params.postId)
    return () => {
      props.removePost();
    }
  }, [params.postId])

  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit(post, history)
  }

  if (!post) {
    return <div>Loading...</div>
  }
  return (
    <div className="update">
     <form onSubmit={e => handleSubmit(e)}>
       <input type="text" name="title" value={post.title} placeholder="제목" onChange={
         e => props.changeTitle(e.target.value)
       }/>
       <p>
         <textarea name="desc" value={post.desc} placeholder="본문" onChange={
           e => props.changeDesc(e.target.value)
         }></textarea>
       </p>
       <p>
         <input type="submit" value="update"/>
       </p>
     </form>
    </div>
  )
}

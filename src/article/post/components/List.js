import {Link, useHistory} from 'react-router-dom';
import {useEffect} from 'react';

function getList(posts, postListIndex) {
  var list = [];

  for (var i = postListIndex; i < posts.length && i < postListIndex + 10; i++) {
    list.push(<li key={posts[i].id}><Link to={"/posts/" + posts[i].id}>{posts[i].title}</Link></li>)
  }
  return list
}

export default function List(props) {
  var history = useHistory();

  var posts = props.posts;
  var postListIndex = props.postListIndex;

  useEffect(() => {
    props.setInitIndex()
  }, [])

  return (
    <div className="list">
      <input type="button" value="create" onClick={e => props.onClick(history, props.logined_id)}/>
      <ul>
        {getList(posts, postListIndex)}
      </ul>
      {postListIndex === 0 ? null : <input type="button" value="이전" onClick={e => props.decreaseIndex()}/>}
      {postListIndex + 10 >= posts.length ? null : <input type="button" value="다음" onClick={e => props.increaseIndex()}/>}
    </div>
  )
}

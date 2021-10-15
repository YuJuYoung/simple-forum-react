import {NavLink} from 'react-router-dom';
import Login from '../login/containers/Login';

export default function Nav(props) {
  var contents = props.contents;
  var list = [];

  for (var i = 0; i < contents.length; i++) {
    list.push(<li key={contents[i].name}><NavLink to={contents[i].path}>{contents[i].name}</NavLink></li>)
  }
  return (
    <div className="nav">
      <ul>
        <li><Login /></li>
        {list}
      </ul>
    </div>
  )
}

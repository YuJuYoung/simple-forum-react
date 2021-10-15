import {Switch, Route} from 'react-router-dom';
import User from '../user/components/User';
import LoginForm from '../login/containers/LoginForm'
import Post from '../post/components/Post'

export default function Article() {
  return (
    <div className="article">
      <Switch>
        <Route path="/users"><User /></Route>
        <Route path="/login"><LoginForm /></Route>
        <Route path="/posts"><Post /></Route>
      </Switch>
    </div>
  )
}

import List from '../containers/List';
import Content from '../containers/Content'
import CreateForm from '../containers/CreateForm'
import UpdateForm from '../containers/UpdateForm'
import {Switch, Route} from 'react-router-dom';

export default function Post() {
  return (
    <div className="post">
      <Switch>
        <Route exact path="/posts"><List /></Route>
        <Route path="/posts/create"><CreateForm /></Route>
        <Route path="/posts/update/:postId"><UpdateForm /></Route>
        <Route path="/posts/:postId"><Content /></Route>
      </Switch>
    </div>
  )
}

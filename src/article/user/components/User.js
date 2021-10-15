import List from '../containers/List';
import CreateForm from '../containers/CreateForm'
import UpdateForm from '../containers/UpdateForm'
import {Switch, Route} from 'react-router-dom'

export default function User() {
  return (
    <div className="user">
      <Switch>
        <Route exact path="/users"><List /></Route>
        <Route path="/users/create"><CreateForm /></Route>
        <Route path="/users/update/:userId"><UpdateForm /></Route>
      </Switch>
    </div>
  )
}

import {connect} from 'react-redux';
import Nav from '../components/Nav';

export default connect(state => {
  return {
    contents: state.contents
  }
})(Nav)

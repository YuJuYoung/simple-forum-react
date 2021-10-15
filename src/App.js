import './App.css';
import {Link} from 'react-router-dom';
import Nav from './nav/containers/Nav';
import Article from './article/components/Article'

function App() {
  return (
    <div className="App">
      <h1><Link to="/">게시판</Link></h1>
      <div id="grid">
        <Nav />
        <Article />
      </div>
    </div>
  );
}

export default App;

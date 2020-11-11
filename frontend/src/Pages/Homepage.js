import logo from '../logo.svg';
import './Homepage.css';

function App() {
  return (
    <div className="home-page">
      <div className="title-container">
        <div className='header'>Welcom to the best secure forum_</div>
      </div>
      <div className='lower-container'>
        <div className='left-container'>
          <input className='home-in-btn' type="button" value="./sign in"></input>
        </div>
        <div className='right-container'>
          <input className='home-up-btn' type="button" value="./sign up"></input>
        </div>
        </div>
    </div>
  );
}

export default App;

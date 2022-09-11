import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateKnockout from './pages/CreateKnockout';
import CreateRoundRobin from './pages/CreateRoundRobin';



function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create-page' element={<CreateKnockout />} />
        <Route path='/create-round-robin' element={<CreateRoundRobin />} />
      </Routes>
    </main>

    // < div className="App" >
    //   <header className="App-header">
    //     <img className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <>
    //     </>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div >
  );
}

export default App;

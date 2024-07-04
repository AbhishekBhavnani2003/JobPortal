import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate
} from "react-router-dom";
import Home from './component/Home';
import Signup from './component/Signup';
import Login from './component/Login';
import Jobpost from './component/JobPost'

function App() {
  return (
    <div className="App">
       <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/postjob' element={<Jobpost/>}></Route>
        </Routes>
       </Router>
    </div>
  );
}

export default App;

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
import Mainjobpage from './component/Mainjobpage';
import Applicationform from './component/Applicationform';
import Yourjob from './component/Yourjob';
import Displayapplicants from './component/Displayapplicants';
import AppliedJobs from './component/AppliedJobs';
import Footer from './component/Footer';
import Updatepost from './component/Updatepost';
import Contact from './component/Contact';

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
          <Route exact path='/jobs' element={<Mainjobpage/>}></Route>
          <Route exact path='/applicationform/:id' element={<Applicationform/>}></Route>
          <Route exact path='/applicants/:id' element={<Displayapplicants/>}></Route>
          <Route exact path='/yourjobs' element={<Yourjob/>}></Route>
          <Route exact path='/appliedjobs' element={<AppliedJobs/>}></Route>
          <Route exact path='/updatepost/:id' element={<Updatepost/>}></Route>
          <Route exact path='/contact' element={<Contact/>}></Route>
        </Routes>
      
       </Router>
    </div>
  );
}

export default App;

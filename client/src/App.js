import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Signup from './components/User/Signup/Signup';
import Login from './components/User/Login/Login';
import Errorpage from './pages/Errorpage';
import UserPage from './pages/UserPage';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
    <Toaster />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/*' element={<UserPage/>}/>

        
        <Route path='*' element={<Errorpage/>} />
      </Routes>
    </>
  );
}

export default App;

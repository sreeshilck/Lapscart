import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Signup from './components/User/Signup/Signup';
import Login from './components/User/Login/Login';
import Errorpage from './pages/Errorpage';
import UserPage from './pages/UserPage';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Nav/Navbar';
import PrivateRoute from './utils/PrivateRoute';


function App() {
  return (
    <>

      {/* <Navbar /> */}
      <Toaster />
      <Routes>
        
        {/* <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
        </Route > */}

        <Route path='/' element={<Home />} />
        <Route path='/user/*' element={<UserPage />} />

        <Route path='*' element={<Errorpage />} />
      </Routes>

    </>
  );
}

export default App;

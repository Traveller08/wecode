import './App.css';
import Login from './components/login/Login';
import { Route} from 'react-router';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './components/register/Register';
import HomePage from './components/homepage/Homepage';
import { useState, useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Cookies from 'js-cookie';
function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    if(Cookies.get('token')){
      setUser(true);
    }
  }, [user]);
  const handleUser = (value)=>{
    setUser(value);
  }
  
  return (
    <Router >
    <div className="App">
      <Routes>
        <Route exact path='/' 
         element={
           <>
           {
              user?   
              <>
                <Dashboard />
              </>:
              <>
                <HomePage />
              </>
           }
           </>
         }
        />
        <Route exact path='/login' element={<> <Login setUser={handleUser} /></>}/>
        <Route exact path='/register' element={<> <Register /></>}/>
        <Route exact path='/profile' element={<> <Profile /></>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;

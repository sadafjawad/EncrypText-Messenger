import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './context/auth';
import ProtectedRouteOutlet from './components/ProtectedRouteOutlet';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/*' element={ <ProtectedRouteOutlet /> }>
            <Route path='' element={ <Home/> } />
            <Route path='account' element={ <Account/> } />
          </Route>
          <Route path='/register' element={ <Register/> } />
          <Route path='/login' element={ <Login/> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;

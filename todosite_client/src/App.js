import './App.css';
import Home from './pages/Home';
import Note from './pages/Note';
import NewNote from './pages/NewNote';
import Login from './pages/Login';
import Register from './pages/Register';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom"
import { useSelector } from 'react-redux';

function App() {
  const userData = useSelector(state => state.user.user);
  
  const user = userData.currentUser;
  const homePage = "/"
  const loginPage = "/login";

  return (
    <Router>
      <Routes>
        <Route path='/' element={ user === null ? <Navigate to={loginPage} /> : <Home />} />
        <Route path='/note/' element={ user === null ? <Navigate to={loginPage} /> : <NewNote />} />
        <Route path='/note/:id' element={ user === null ? <Navigate to={loginPage} /> : <Note />} />

        {/* Login pages */}
        <Route path='/login' element={user !== null ? <Navigate to={homePage} /> : <Login />} />
        <Route path='/register' element={user !== null ? <Navigate to={homePage} /> : <Register />} />

        <Route path="/logout" element={user ? <Login /> : <Navigate to="/" /> } />

        {/* 404 route */}
        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;

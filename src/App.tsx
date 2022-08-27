import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import Contacts from './features/contacts/Contacts';
import { AuthForm } from './features/auth/AuthForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element= {<AuthForm />} path="/login" />
          <Route element= {<AuthForm />} path="/signup" />
          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/' element={<Contacts/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

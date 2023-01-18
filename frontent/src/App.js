import { HashRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import AboutUs from './components/AboutUs/AboutUs';
import Dashboard from './components/Dashboard/Dashboard';
import Page404 from './components/Page404/Page404';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    // <div id="App" style={{
    //     backgroundImage:`url(${background})`,
    //     minHeight: "100vh",
    //     backgroundSize: "cover"
    //     }}>
    <div id='App'>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/logIn" element={<LogIn/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
                <Route path="/forgotPassword" element={<ForgotPassword/>}/>
                <Route path="/resetPassword" element={<ResetPassword/>}/>
                <Route path="/aboutUs" element={<AboutUs/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes> 
        </Router>  
    </div>
);
}

export default App;

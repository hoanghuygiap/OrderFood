import {BrowserRouter  ,Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/admin-login' element={<AdminLogin/>}></Route>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

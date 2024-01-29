import { Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { isAuthenticated } from './store/selectors/AuthSelector';

import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/vendor/glightbox/css/glightbox.min.css';
import './assets/vendor/remixicon/remixicon.css';
import './App.css';
import { checkAutoLogin } from './services/SignupService';

import { Suspense, lazy, useEffect } from 'react';
import CategoryList from './components/admin/categoryList/CategoryList';
import InsertCategory from './components/admin/categoryList/InsertCategory';
import CreateProject from './components/admin/project/CreateProject';
import ProjectList from './components/admin/project/ProjectList';




const Header = lazy(() => import('./components/header/Header'));
const Register = lazy(() => import('./components/register/Register'));
const Login = lazy(() => import('./components/login/Login'));
const AdminHome = lazy(() => import('./components/admin/home/AdminHome'));
const PorfolioDetails = lazy(() => import('./components/porfolio/PorfolioDetails'));







const App = (props) => {
  const isAuth = useSelector(state => isAuthenticated(state));
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const allowedRoutes = () =>{
    let routes = (
      <Routes>
        <Route path='/' exact element={<Header/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/details' element={<PorfolioDetails/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    );
    if (isAuth) {
      routes = (
        <Routes>
          <Route path='/' exact element={<Header/>} />
          <Route path='/admin' element={<AdminHome/>}>
            <Route path='category' element={<CategoryList />} />
            <Route path='create-category' element={<InsertCategory />} />
            <Route path='create-project' element={<CreateProject />} />
            <Route path='project/:id' element={<ProjectList />} />
          </Route>
        </Routes>
      );
    }
      
    return routes;
  };

  useEffect(()=>{
    checkAutoLogin(dispatch, navigate);
  }, []);
  
  return (
    <div className="App">
      
     
        <Suspense fallback={<div>Loading...</div>}>
          {allowedRoutes()}
        </Suspense>
        
      
      
    </div>
  );
}

export default App;

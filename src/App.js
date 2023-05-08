import React from 'react';
import './App.css';
import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  BrowserRouter
} from 'react-router-dom';




const Landing = () => {
  return <h2>Landing (Public: anyone can access this page)</h2>;
};

const Home = () => {
  return <h2>Home (Protected: authenticated user required)</h2>;
};

const Dashboard = () => {
  return <h2>Dashboard (Protected: authenticated user required)</h2>;
};

const Admin = () => {
  return (
    <h2>
      Admin (Protected: authenticated user with role 'admin' required)
    </h2>
  );
};

const ProtectedRoute = ({ user,children, redirectPath = '/landing' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

const Layout = ({user, setUser}) => {
  return <>
   <header>
       <div className='links'>
        <Link to="landing">Landing</Link>
        <Link to="home">Home</Link>
        <Link to="dashboard">Dashboard</Link>
        <Link to="admin">admin</Link>
        <Link to="404">404</Link>
        <button onClick={() => {setUser(!user)}}>{!user? 'Activar': 'Desactivar'}</button> 
      </div> 
      </header>

      <main>
        <p>Hola</p>
        <Outlet />
      </main>

      <footer>Footer</footer>
  </>
}


function App() {

  const [user, setUser] = React.useState(false);

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser}/>}>
          <Route index element={<Landing />} />
          <Route path="landing" element={<Landing />} />        
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="home" element={<Home />} />                    
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
          </Route>        
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

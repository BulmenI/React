import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
    
      <Routes>
  <Route path="/login" element={<RegisterPage />} />
  <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
    <Route path="/" element={<HomePage />} />
  </Route>
</Routes>
    </>
  );
}

export default App;
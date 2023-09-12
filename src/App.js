import { ApolloProvider } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import { isLoggedIn } from './auth';
import CompanyDetail from './components/CompanyDetail';
import LoginForm from './components/LoginForm';
import JobBoard from './components/JobBoard';
import JobDetail from './components/JobDetail';
import JobForm from './components/JobForm';
import UserCreateForm from './components/UserCreateForm';
import NavBar from './components/NavBar';
import { apolloClient } from './graphql/project-queries';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/');
  };

  return (
    // apolloprovider makes client instance available to all components in app
    <ApolloProvider client={apolloClient}>
      <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<JobBoard />} />
          <Route path="/companies/:companyId" element={<CompanyDetail />} />
          <Route path="/jobs/new" element={<JobForm />} />
          <Route path="/signUp" element={<UserCreateForm />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        </Routes>
      </main>
    </ApolloProvider>
  );
}

export default App;

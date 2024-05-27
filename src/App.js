import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Container, AppBar, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PostDetail from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Register from './pages/Register';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import UserModeration from './pages/UserModeration';
import Notifications from './pages/Notifications';
import Search from './pages/SearchResults';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/App.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static">
            <Header />
          </AppBar>
          <Container sx={{ flex: 1 }}>
            <Routes>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/post/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/createpost" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
              <Route path="//edit/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
              <Route path="/moderation" element={<PrivateRoute><UserModeration /></PrivateRoute>} />
              <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<Navigate to="/welcome" />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/welcome" />;
};

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import { AuthProvider } from './utils/auth'
import RequireAuth from './components/RequireAuth'

function App() {
  const queryClient = new QueryClient()


  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route path='/profile/:id' element={<RequireAuth><Profile /></RequireAuth>} />

          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App

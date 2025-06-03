import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Import pages from first project
import FirstProjectHome from './pages/first-project/Home'
import FirstProjectAbout from './pages/first-project/About'

// Import pages from second project
import SecondProjectHome from './pages/second-project/Home'
import SecondProjectDashboard from './pages/second-project/Dashboard'

const App = () => {
  const [hasCompletedFirstProject, setHasCompletedFirstProject] = useState(false)

  // Check if user has completed first project
  useEffect(() => {
    const completed = localStorage.getItem('completedFirstProject')
    if (completed === 'true') {
      setHasCompletedFirstProject(true)
    }
  }, [])

  return (
    <Routes>
      {/* First Project Routes */}
      <Route path="/" element={<FirstProjectHome />} />
      <Route path="/about" element={<FirstProjectAbout />} />
      
      {/* Second Project Routes */}
      <Route 
        path="/dashboard" 
        element={
          hasCompletedFirstProject ? (
            <SecondProjectDashboard />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      <Route 
        path="/home" 
        element={
          hasCompletedFirstProject ? (
            <SecondProjectHome />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
    </Routes>
  )
}

export default App 
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Exercises from './pages/Exercises.jsx'
import Sessions from './pages/Sessions.jsx'
import Progress from './pages/Progress.jsx'
import Users from './pages/Users.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="exercises" element={<Exercises />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="progress" element={<Progress />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  )
}

export default App
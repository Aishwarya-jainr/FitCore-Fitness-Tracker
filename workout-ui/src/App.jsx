import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Exercises from './pages/Exercises'
import Sessions from './pages/Sessions'
import Progress from './pages/Progress'
import Users from './pages/Users'

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
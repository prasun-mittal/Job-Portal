import React, { useContext } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/home'
import ApplyJobs from './pages/ApplyJobs'
import Application from './pages/Application'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'

const App = () => {

  const {showRecruiterLogin} = useContext(AppContext)

  return (
    <div>
    { showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-Job/:id' element={<ApplyJobs/>}/>
        <Route path='/applications' element={<Application/>}/>
      </Routes>
    </div>
  )
}

export default App
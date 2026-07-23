import React, { useContext } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/home'
import ApplyJobs from './pages/ApplyJobs'
import Application from './pages/Application'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import ManageJobs from './pages/ManageJobs'
import ViewApplication from './pages/ViewApplication'
import AddJob from './pages/AddJob'

const App = () => {

  const {showRecruiterLogin} = useContext(AppContext)

  return (
    <div>
    { showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-Job/:id' element={<ApplyJobs/>}/>
        <Route path='/applications' element={<Application/>}/>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='add-job' element={<AddJob/>} />
          <Route path='manage-job' element={<ManageJobs/>} />
          <Route path='view-applications' element={<ViewApplication/>} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
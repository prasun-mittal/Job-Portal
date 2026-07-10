import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/home'
import ApplyJobs from './pages/ApplyJobs'
import Application from './pages/application'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/applyJob/:id' element={<ApplyJobs/>}/>
        <Route path='/applications' element={<Application/>}/>
      </Routes>
    </div>
  )
}

export default App
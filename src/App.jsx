import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignupContainer from './pages/SignupContainer'
import LoginContainer from './pages/LoginContainer'
import NotFound from './pages/NotFound'
import AccessDenied from './pages/AccessDenied'
import TasksPage from './pages/taskPage'
import CreateTaskPage from './pages/CreateTaskPage'
import EditTaskPage from './pages/EditTaskPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<SignupContainer />} />
        <Route path='/login' element={<LoginContainer />} />

        <Route path='/tasks' element={<TasksPage />} />
        <Route path='/edit/:id' element={<EditTaskPage />} />
        <Route path='/create-task' element={<CreateTaskPage />} />
        <Route path='edit-task/:taskId' element={<EditTaskPage />} />

        <Route path='/denied' element={<AccessDenied />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

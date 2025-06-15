import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import LoginContainer from './pages/auth/LoginContainer'
import SignupContainer from './pages/auth/SignupContainer'
import NotFound from './pages/NotFound'
import AccessDenied from './pages/AccessDenied'
import ProjectsPage from './pages/projects/ProjectPage'
import CreateProjectPage from './pages/projects/CreateProject'
import EditProjectPage from './pages/projects/EditProjectPage'
import ProjectDetailsPage from './pages/projects/projectDetailsPage'
import CreateProjectTaskPage from './pages/projects/CreateProjectTaskPage'
import EditProjectTaskPage from './pages/projects/EditProjectTask'
import ManageProjectMembersPage from './pages/projects/ManageProjeceMembersPage'
import TasksPage from './pages/tasks/TaskPage'
import EditTaskPage from './pages/tasks/EditTaskPage'
import CreateTaskPage from './pages/tasks/CreateTaskPage'

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
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/create-project' element={<CreateProjectPage />} />
        <Route path='/edit-project/:projectId' element={<EditProjectPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path='/projects/:projectId/create-task' element={<CreateProjectTaskPage />} />
        <Route path='/projects/:projectId/edit-task/:taskId' element={<EditProjectTaskPage />} />
        <Route path="/projects/:projectId/manage-members" element={<ManageProjectMembersPage />} />

        {/* Error Routes */}

        <Route path='/denied' element={<AccessDenied />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

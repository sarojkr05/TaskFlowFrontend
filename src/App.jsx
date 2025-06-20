import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import LoginContainer from './pages/auth/LoginContainer'
import SignupContainer from './pages/auth/SignupContainer'
import NotFound from './pages/NotFound'
import AccessDenied from './pages/AccessDenied'
import ProjectsPage from './pages/projects/ProjectPage'
import TasksPage from './pages/tasks/TaskPage'
import EditTaskPage from './pages/tasks/EditTaskPage'
import CreateTaskPage from './pages/tasks/CreateTaskPage'
import ProjectDetailsContainer from './pages/projects/ProjectDetailsContainer'
import CreateProjectTaskContainer from './pages/projects/CreateProjectTaskContainer'
import CreateProjectContainer from './pages/projects/CreateProjectContainer'
import EditProjectContainer from './pages/projects/EditProjectContainer'
import EditProjectTaskContainer from './pages/projects/EditProjectTaskContainer'
import ManageProjectMembersContainer from './pages/projects/ManageProjectMembersContainer'
import socket from './helpers/socket'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { fetchNotifications } from './features/notifications/notificationSlice'
import AllNotifications from './pages/AllNotifications'

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(user?._id) {
      socket.emit("register", user._id);
      dispatch(fetchNotifications());
    }
    socket.on("projectAdded", ({ message }) => {
      console.log("Real-time notification received:", message);
      toast.info(message);
    });
    return () => {
      socket.off("projectAdded");
    };
  }, [user, dispatch]);


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
        <Route path='/create-project' element={<CreateProjectContainer />} />
        <Route path='/edit-project/:projectId' element={<EditProjectContainer />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsContainer />} />
        <Route path='/projects/:projectId/create-task' element={<CreateProjectTaskContainer />} />
        <Route path='/projects/:projectId/edit-task/:taskId' element={<EditProjectTaskContainer />} />
        <Route path="/projects/:projectId/manage-members" element={<ManageProjectMembersContainer />} />
        <Route path="/notifications" element={<AllNotifications />} />


        {/* Error Routes */}

        <Route path='/denied' element={<AccessDenied />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

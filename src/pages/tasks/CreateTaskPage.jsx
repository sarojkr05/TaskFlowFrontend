import { useCreateTaskMutation } from '../../features/tasks/taskApi'
import { toast } from 'sonner';
import TaskForm from './TaskForm';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';

function CreateTaskPage() {

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const navigate = useNavigate();

  async function handleFormSubmit(formData) {
    try {
      const dataToSend = { ...formData }
      //remove assignedTo if it's an empty string
      if(!dataToSend.assignedTo) {
        delete dataToSend.assignedTo;
      }
      await createTask(dataToSend).unwrap();
      toast.success("Task created successfully!");
      navigate('/tasks')
    } catch (error) {
      toast.error(error?.data?.message || "Faled to create task")
    }
  }

  return (
    <Layout>
    <div className='mt-6 px-4'>
      <TaskForm onSubmit={handleFormSubmit}/>
    </div>
    </Layout>
  )
}

export default CreateTaskPage

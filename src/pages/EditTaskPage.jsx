// pages/EditTaskPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "../features/tasks/taskApi";
import TaskForm from "../pages/TaskForm";
import { toast } from "sonner";
import Layout from "../layout/Layout";

function EditTaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: isFetching } = useGetTaskByIdQuery(taskId);
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const handleFormSubmit = async (formData) => {
    try {
      const cleanedData = { ...formData };
      // 🔧 Remove invalid ObjectId before sending
      if (!cleanedData.assignedTo) {
        delete cleanedData.assignedTo;
      }
      const res = await updateTask({ taskId, updatedData: cleanedData }).unwrap();
      toast.success("Task updated successfully!");
      navigate("/tasks");
    } catch (error) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  return (
    <Layout>
      <div className="mt-6 px-4">
        {isFetching ? (
          <p className="text-gray-600">Loading task...</p>
        ) : data?.task ? (
          <TaskForm initialData={data.task} onSubmit={handleFormSubmit} />
        ) : (
          <p className="text-red-500">Task not found</p>
        )}
      </div>
    </Layout>
  );
}

export default EditTaskPage;

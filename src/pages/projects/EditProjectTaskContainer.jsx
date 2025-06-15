import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTasksByProjectIdQuery,
  useUpdateTaskInProjectMutation,
} from "../../features/projects/projectApi";
import EditProjectTaskPage from "../../pages/projects/EditProjectTask";
import { toast } from "sonner";

function EditProjectTaskContainer() {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetTasksByProjectIdQuery(projectId);
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskInProjectMutation();

  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    if (data?.tasks?.length) {
      const found = data.tasks.find((t) => t._id === taskId);
      if (found) {
        setTask({ title: found.title, description: found.description });
      }
    }
  }, [data, taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask({ projectId, taskId, updatedData: task }).unwrap();
      toast.success("Task updated!");
      navigate(`/projects/${projectId}`);
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <EditProjectTaskPage
      task={task}
      setTask={setTask}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isUpdating={isUpdating}
      error={error}
    />
  );
}

export default EditProjectTaskContainer;
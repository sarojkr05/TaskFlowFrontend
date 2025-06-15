import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useCreateTaskInProjectMutation,
  useGetProjectMembersQuery,
} from "../../features/projects/projectApi";
import CreateProjectTaskPage from "../../pages/projects/CreateProjectTaskPage";

function CreateProjectTaskContainer() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [createTask, { isLoading }] = useCreateTaskInProjectMutation();
  const { data: memberData, isLoading: isMemberLoading } =
    useGetProjectMembersQuery(projectId);

  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        ...task,
        projectId,
        assignedTo: task.assignedTo || null,
      }).unwrap();
      toast.success("Task created successfully!");
      navigate(`/projects/${projectId}`);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create task");
    }
  };

  return (
    <CreateProjectTaskPage
      task={task}
      setTask={setTask}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isMemberLoading={isMemberLoading}
      members={memberData?.members || []}
    />
  );
}

export default CreateProjectTaskContainer;
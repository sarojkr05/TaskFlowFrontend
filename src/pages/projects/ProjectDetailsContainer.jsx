import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useGetTasksByProjectIdQuery,
  useDeleteTaskInProjectMutation,
  useGetProjectMembersQuery,
} from "../../features/projects/projectApi";
import { useSelector } from "react-redux";
import ProjectDetailsPage from "../../pages/projects/projectDetailsPage";

function ProjectDetailsContainer() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProjectByIdQuery(projectId);
  const { data: taskData, isLoading: isTaskLoading, error: taskError } =
    useGetTasksByProjectIdQuery(projectId);
  const { data: memberData, isLoading: loadingMembers } =
    useGetProjectMembersQuery(projectId);

  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [deleteTaskInProject] = useDeleteTaskInProjectMutation();

  const currentUserId = useSelector((state) => state.auth.user?._id);

  const project = data?.project || {};
  const tasks = taskData?.tasks || [];

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");

  const handleUpdate = async () => {
    try {
      await updateProject({ projectId, updatedData: { name, description } }).unwrap();
      toast.success("Project updated successfully!");
      setEditMode(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update project");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;
    try {
      await deleteProject(projectId).unwrap();
      toast.success("Project deleted successfully!");
      navigate("/projects");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete project");
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;
    try {
      await deleteTaskInProject({ projectId, taskId }).unwrap();
      toast.success("Task deleted!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete task");
    }
  };

  return (
    <ProjectDetailsPage
      isLoading={isLoading}
      error={error}
      project={project}
      tasks={tasks}
      isTaskLoading={isTaskLoading}
      taskError={taskError}
      currentUserId={currentUserId}
      editMode={editMode}
      setEditMode={setEditMode}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      isUpdating={isUpdating}
      handleUpdate={handleUpdate}
      isDeleting={isDeleting}
      handleDelete={handleDelete}
      handleDeleteTask={handleDeleteTask}
    />
  );
}

export default ProjectDetailsContainer;

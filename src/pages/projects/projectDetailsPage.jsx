// src/pages/ProjectDetailsPage.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import {
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useGetTasksByProjectIdQuery,
  useDeleteTaskInProjectMutation,
} from "../../features/projects/projectApi";
import { Loader2, Pencil, Trash2 } from "lucide-react";

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { data, isLoading, error } = useGetProjectByIdQuery(projectId);
  const {
    data: taskData,
    isLoading: isTaskLoading,
    error: taskError,
  } = useGetTasksByProjectIdQuery(projectId);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const navigate = useNavigate();

  const project = data?.project;
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [deleteTaskInProject] = useDeleteTaskInProjectMutation();

  const handleUpdate = async () => {
    try {
      await updateProject({
        projectId,
        updatedData: { name, description },
      }).unwrap();
      toast.success("Project updated successfully!");
      setEditMode(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update project");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
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
      // Assuming you already have a deleteTask mutation
      await deleteTaskInProject({ projectId, taskId }).unwrap();
      toast.success("Task deleted!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete task");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center gap-2 p-4 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading project...
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="p-4 text-red-500">Project not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Project Info */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border">
          {editMode ? (
            <div className="space-y-4">
              <input
                className="w-full border p-3 rounded text-xl font-semibold"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
              />
              <textarea
                className="w-full border p-3 rounded"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project description"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {project.name}
              </h1>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setName(project.name);
                    setDescription(project.description);
                    setEditMode(true);
                  }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
                <Link
                  to={`/projects/${projectId}/manage-members`}
                  className="text-blue-600 hover:underline"
                >
                  Manage Members
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Task List */}
        <div className="bg-white shadow-md rounded-lg p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Tasks</h2>
            <Link
              to={`/projects/${projectId}/create-task`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
            >
              + Create Task
            </Link>
          </div>

          {isTaskLoading && (
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading tasks...
            </div>
          )}
          {taskError && (
            <p className="text-red-500 mb-4">Failed to load tasks</p>
          )}

          {taskData?.tasks?.length > 0 ? (
            <ul className="grid md:grid-cols-2 gap-4">
              {taskData.tasks.map((task) => (
                <li
                  key={task._id}
                  className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {task.description}
                  </p>
                  {task.assignedTo && (
                    <p className="text-sm text-gray-500 mt-1">
                      Assigned to: {task.assignedTo?.email || "User"}
                    </p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <Link
                      to={`/projects/${projectId}/edit-task/${task._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !isTaskLoading && (
              <p className="text-gray-500 italic">
                No tasks found for this project.
              </p>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ProjectDetailsPage;

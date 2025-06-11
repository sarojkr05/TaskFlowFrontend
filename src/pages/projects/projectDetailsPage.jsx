// src/pages/ProjectDetailsPage.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import Layout from "../../layout/Layout";
import { useDeleteProjectMutation, useGetProjectByIdQuery, useUpdateProjectMutation } from "../../features/projects/projectApi";

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { data, isLoading, error } = useGetProjectByIdQuery(projectId);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const project = data?.project;

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const navigate = useNavigate();
  const [deleteProject, { isLoading: isDeleting  }] = useDeleteProjectMutation();

  const handleDelete = async () => {
    const confimed = window.confirm("Are you sure you want to delete this project?");
    if (!confimed) return;
    try {
      await deleteProject(projectId).unwrap();
      toast.success("Project deleted successfully!");
      navigate("/projects");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete project");
    }
  }

  const handleUpdate = async () => {
    try {
      await updateProject({ projectId, updatedData: { name, description } }).unwrap();
      toast.success("Project updated successfully!");
      setEditMode(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update project");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="p-4">Loading project...</div>
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
      <div className="container mx-auto p-4">
        {editMode ? (
          <div className="space-y-3">
            <input
              className="w-full border p-2 rounded text-xl font-bold"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="space-x-3">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <button
              onClick={() => {
                setName(project.name);
                setDescription(project.description);
                setEditMode(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Project
            </button>
            <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Project"}
              </button>
          </>
        )}

        <div className="mt-6">
          <p className="font-semibold">Tasks will be listed here...</p>
          {/* You can show tasks under this project later here */}
        </div>
      </div>
    </Layout>
  );
}

export default ProjectDetailsPage;

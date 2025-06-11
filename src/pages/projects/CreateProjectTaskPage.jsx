import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCreateTaskInProjectMutation } from "../../features/projects/projectApi";
import Layout from "../../layout/Layout";
import { toast } from "sonner";

function CreateProjectTaskPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [createTask, { isLoading }] = useCreateTaskInProjectMutation();

  const [task, setTask] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ ...task, projectId }).unwrap();
      toast.success("Task created successfully!");
      navigate(`/projects/${projectId}`);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create task");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-3 rounded"
            placeholder="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <textarea
            className="w-full border p-3 rounded"
            rows={4}
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default CreateProjectTaskPage;

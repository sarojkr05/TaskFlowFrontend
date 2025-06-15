import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useCreateTaskInProjectMutation,
  useGetProjectMembersQuery,
} from "../../features/projects/projectApi";
import Layout from "../../layout/Layout";
import { toast } from "sonner";

function CreateProjectTaskPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [createTask, { isLoading }] = useCreateTaskInProjectMutation();
  const { data: memberData, isLoading: isMemberLoading } =
    useGetProjectMembersQuery(projectId);

  const [task, setTask] = useState({ title: "", description: "", assignedTo: "" });

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
    <Layout>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Create New Task
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-indigo-400"
              placeholder="Title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
            <textarea
              className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-indigo-400"
              rows={4}
              placeholder="Description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              required
            />
            <select
              className="w-full border p-3 rounded"
              value={task.assignedTo || ""}
              onChange={(e) =>
                setTask({ ...task, assignedTo: e.target.value || null })
              }
              disabled={isMemberLoading}
            >
              <option value="">Unassigned</option>
              {isMemberLoading ? (
                <option disabled>Loading members...</option>
              ) : memberData?.members?.length === 0 ? (
                <option disabled>No members found</option>
              ) : (
                memberData?.members.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.email}
                  </option>
                ))
              )}
            </select>
            {memberData?.members?.length === 0 ? (
              <p className="text-sm text-red-500 mt-1">
                ⚠️ No members found in this project. Task will be unassigned.
              </p>
            ) : null}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Task"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProjectTaskPage;

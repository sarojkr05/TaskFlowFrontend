import Layout from "../../layout/Layout";

function EditProjectTaskPage({ task, setTask, handleSubmit, isLoading, isUpdating, error }) {
  if (isLoading) return <Layout><p className="p-4">Loading task...</p></Layout>;
  if (error) return <Layout><p className="p-4 text-red-500">Task not found</p></Layout>;

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-3 rounded"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <textarea
            className="w-full border p-3 rounded"
            rows={4}
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditProjectTaskPage;
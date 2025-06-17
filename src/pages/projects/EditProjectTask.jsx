import Layout from "../../layout/Layout";

function EditProjectTaskPage({ task, setTask, handleSubmit, isLoading, isUpdating, error, isMemberLoading, members }) {
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
              ) : members.length === 0 ? (
                <option disabled>No members found</option>
              ) : (
                members.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.email}
                  </option>
                ))
              )}
            </select>
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
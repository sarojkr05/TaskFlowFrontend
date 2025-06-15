import Layout from "../../layout/Layout";

function ManageProjectMembersPage({
  email,
  setEmail,
  loadingMembers,
  adding,
  memberData,
  handleAddMember,
  handleRemove,
}) {
  return (
    <Layout>
      <div className="min-h-screen py-10 px-4 bg-slate-50">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Manage Project Members</h1>

          {/* Add Member Form */}
          <form onSubmit={handleAddMember} className="flex gap-2 mb-6">
            <input
              type="email"
              placeholder="Enter member's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
              disabled={adding}
            >
              {adding ? "Adding..." : "Add"}
            </button>
          </form>

          {/* Member List */}
          <h2 className="text-lg font-semibold mb-2">Current Members</h2>
          {loadingMembers ? (
            <p>Loading members...</p>
          ) : (
            <ul className="space-y-2">
              {memberData?.members?.map((user) => (
                <li
                  key={user._id}
                  className="flex justify-between items-center bg-slate-100 p-2 rounded"
                >
                  <span>{user.email}</span>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleRemove(user._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ManageProjectMembersPage;
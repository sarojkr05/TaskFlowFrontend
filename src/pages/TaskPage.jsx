import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import useTaskContainer from "../pages/taskContainer";
import { useRef, useEffect } from "react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

const priorityColors = {
  low: "bg-gray-200 text-gray-800",
  medium: "bg-orange-200 text-orange-800",
  high: "bg-red-200 text-red-800",
};

const TasksPage = () => {
  const {
    selectedTask,
    filterStatus,
    tasks,
    isLoading,
    isError,
    error,
    dispatch,
    handleDelete,
    handleCreate,
    setFilterStatus,
    setSelectedTask,
    clearSelectedTask,
    handleClose,
  } = useTaskContainer();

  const detailRef = useRef(null);

  useEffect(() => {
    if (selectedTask && window.innerWidth < 768 && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (selectedTask && detailRef.current) {
    detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  }, [selectedTask]);

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto font-sans">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">📝 Task Manager</h1>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Create Task
          </button>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-6">
          {["all", "pending", "in-progress", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => dispatch(setFilterStatus(status))}
              className={`px-4 py-1.5 rounded-full border shadow-sm transition cursor-pointer ${
                filterStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        {isLoading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : isError ? (
          <p className="text-red-500">
            {error?.data?.message || "Something went wrong"}
          </p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600">No tasks found for "{filterStatus}"</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`border rounded-lg p-4 shadow-sm bg-white transition ${
                  selectedTask?._id === task._id
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => dispatch(setSelectedTask(task))}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1 text-sm">
                      <span
                        className={`px-2 py-0.5 rounded-full ${
                          statusColors[task.status]
                        }`}
                      >
                        {task.status}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full ${
                          priorityColors[task.priority]
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Link
                      to={`/edit-task/${task._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Task Detail */}
        {selectedTask && (
          <div
            className="mt-10 p-6 bg-gray-50 border rounded-lg shadow-inner"
            ref={detailRef}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700">
                🗂️ Task Details
              </h2>
              <button
                onClick={handleClose}
                className="text-red-600 hover:text-red-800 text-xl font-bold cursor-pointer"
                title="Close"
              >
                ❌
              </button>
            </div>

            <p className="mb-2">
              <strong>Title:</strong> {selectedTask.title}
            </p>
            <p className="mb-2">
              <strong>Description:</strong>{" "}
              {selectedTask.description || (
                <span className="italic text-gray-500">No description</span>
              )}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-0.5 rounded-full text-sm ${
                  statusColors[selectedTask.status]
                }`}
              >
                {selectedTask.status}
              </span>
            </p>
            <p className="mb-4">
              <strong>Priority:</strong>{" "}
              <span
                className={`px-2 py-0.5 rounded-full text-sm ${
                  priorityColors[selectedTask.priority]
                }`}
              >
                {selectedTask.priority}
              </span>
            </p>
            <button
              onClick={handleClose}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TasksPage;

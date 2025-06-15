import Layout from "../../layout/Layout";
import useTaskContainer from "../../hooks/useTaskContainer";
import TaskFilter from "../../components/TaskFilter";
import TaskItem from "../../components/TaskItem";
import TaskDetail from "../../components/TaskDetail";
import { useEffect, useRef } from "react";
import { useUpdateTaskStatusMutation } from "../../features/tasks/taskApi";
import { toast } from "sonner";

const TasksPage = () => {
  const {
    selectedTask,
    filterStatus,
    tasks,
    isLoading,
    isError,
    error,
    handleDelete,
    handleCreate,
    handleFilterChange,
    handleSelectTask,
    handleClose,
  } = useTaskContainer();

  const detailRef = useRef(null);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  useEffect(() => {
    if (selectedTask && detailRef.current) {
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

        <TaskFilter currentStatus={filterStatus} onChange={handleFilterChange} />

        {isLoading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : isError ? (
          <p className="text-red-500">{error?.data?.message || "Something went wrong"}</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600">No tasks found for "{filterStatus}"</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                isSelected={selectedTask?._id === task._id}
                onSelect={() => handleSelectTask(task)}
                onComplete={() =>
                  updateTaskStatus({ taskId: task._id, updatedData: { status: "completed" } })
                    .unwrap()
                    .then(() => toast.success("Task marked as completed"))
                    .catch(() => toast.error("Failed to update task"))
                }
                onDelete={() => handleDelete(task._id)}
              />
            ))}
          </ul>
        )}

        {selectedTask && <TaskDetail task={selectedTask} onClose={handleClose} scrollRef={detailRef} />}
      </div>
    </Layout>
  );
};

export default TasksPage;

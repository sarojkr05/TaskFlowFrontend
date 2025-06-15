import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSelectedTask,
  clearSelectedTask,
  setFilterStatus,
} from "../features/tasks/taskSlice";
import {
  useGetAllTasksQuery,
  useDeleteTaskMutation,
} from "../features/tasks/taskApi";
import { toast } from "sonner";

const useTaskContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedTask, filterStatus } = useSelector((state) => state.task);
  const { data, isLoading, isError, error } = useGetAllTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();

  const tasks = data?.tasks || [];

  const filteredTasks =
    filterStatus === "all"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId).unwrap();
        toast.success("Task deleted successfully");
        dispatch(clearSelectedTask());
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete task");
      }
    }
  };

  return {
    selectedTask,
    filterStatus,
    tasks: filteredTasks,
    isLoading,
    isError,
    error,
    handleDelete,
    handleCreate: () => navigate("/create-task"),
    handleFilterChange: (status) => dispatch(setFilterStatus(status)),
    handleSelectTask: (task) => dispatch(setSelectedTask(task)),
    handleClose: () => {
      dispatch(clearSelectedTask());
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  };
};

export default useTaskContainer;

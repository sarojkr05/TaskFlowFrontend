// components/TaskContainer.jsx
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

  const handleEdit = (taskId) => {
    navigate(`/edit/${taskId}`);
  };

  const handleDelete = async (taskId) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    try {
      await deleteTask(taskId).unwrap();
      toast.success("Task deleted successfully");
      dispatch(clearSelectedTask());
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete task");
    }
  }
};

  const handleCreate = () => {
    navigate("/create-task");
  };

  const handleClose = () => {
  console.log("Closing detail section...");
  dispatch(clearSelectedTask())
  window.scrollTo({ top: 0, behavior: "smooth" });
};


  return {
    selectedTask,
    filterStatus,
    tasks: filteredTasks,
    isLoading,
    isError,
    error,
    dispatch,
    handleEdit,
    handleDelete,
    handleCreate,
    setFilterStatus,
    setSelectedTask,
    clearSelectedTask,
    handleClose
  };
};

export default useTaskContainer;

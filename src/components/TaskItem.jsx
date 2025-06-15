import { Link } from "react-router-dom";
import { statusColors, priorityColors } from "../utils/color";

const TaskItem = ({ task, isSelected, onSelect, onComplete, onDelete }) => (
  <li
    className={`border rounded-lg p-4 shadow-sm bg-white transition ${
      isSelected ? "border-blue-500 ring-2 ring-blue-200" : ""
    }`}
  >
    <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center">
      <div className="flex-1 cursor-pointer" onClick={onSelect}>
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <div className="flex flex-wrap gap-2 mt-1 text-sm">
          <span className={`px-2 py-0.5 rounded-full ${statusColors[task.status]}`}>
            {task.status}
          </span>
          <span className={`px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority} Priority
          </span>
        </div>
      </div>
      <div className="flex gap-3 items-center mt-3 sm:mt-0">
        {task.status !== "completed" && (
          <button onClick={onComplete} className="text-green-600 hover:underline text-sm">
            ✅ Mark as Completed
          </button>
        )}
        <Link to={`/edit-task/${task._id}`} className="text-blue-600 hover:underline text-sm">
          ✏️ Edit
        </Link>
        <button onClick={onDelete} className="text-red-600 hover:underline text-sm">
          🗑️ Delete
        </button>
      </div>
    </div>
  </li>
);

export default TaskItem;

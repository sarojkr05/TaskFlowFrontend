import { statusColors, priorityColors } from "../utils/color";

const TaskDetail = ({ task, onClose, scrollRef }) => (
  <div className="mt-10 p-6 bg-gray-50 border rounded-lg shadow-inner" ref={scrollRef}>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-700">🗂️ Task Details</h2>
      <button
        onClick={onClose}
        className="text-red-600 hover:text-red-800 text-xl font-bold cursor-pointer"
        title="Close"
      >
        ❌
      </button>
    </div>
    <p className="mb-2"><strong>Title:</strong> {task.title}</p>
    <p className="mb-2"><strong>Description:</strong> {task.description || <span className="italic text-gray-500">No description</span>}</p>
    <p className="mb-2"><strong>Status:</strong> <span className={`px-2 py-0.5 rounded-full text-sm ${statusColors[task.status]}`}>{task.status}</span></p>
    <p className="mb-4"><strong>Priority:</strong> <span className={`px-2 py-0.5 rounded-full text-sm ${priorityColors[task.priority]}`}>{task.priority}</span></p>
    <button onClick={onClose} className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer">Close</button>
  </div>
);

export default TaskDetail;

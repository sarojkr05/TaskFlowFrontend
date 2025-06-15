const TaskFilter = ({ currentStatus, onChange }) => {
  const statuses = ["all", "pending", "in-progress", "completed"];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`px-4 py-1.5 rounded-full border shadow-sm transition cursor-pointer ${
            currentStatus === status
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;

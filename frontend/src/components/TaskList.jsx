export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above to get started.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className={`task-item ${task.completed ? "completed" : ""}`}>
          <label className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)}
            />
          </label>

          <div className="task-content">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
          </div>

          <div className="task-actions">
            <button className="btn btn-small" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button className="btn btn-small btn-danger" onClick={() => onDelete(task._id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

import { useEffect, useState } from "react";
import { api } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getAll();
      setTasks(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateOrUpdate = async (form) => {
    try {
      if (editingTask) {
        const updated = await api.update(editingTask._id, {
          ...form,
          completed: editingTask.completed,
        });
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
        setEditingTask(null);
      } else {
        const created = await api.create(form);
        setTasks((prev) => [created, ...prev]);
      }
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (task) => {
    try {
      const updated = await api.update(task._id, { ...task, completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.remove(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      if (editingTask?._id === id) setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <p className="subtitle">A simple MERN CRUD app</p>
      </header>

      <TaskForm
        onSubmit={handleCreateOrUpdate}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="empty-state">Loading tasks…</p>
      ) : (
        <>
          <p className="task-count">
            {remaining} of {tasks.length} task{tasks.length === 1 ? "" : "s"} remaining
          </p>
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}

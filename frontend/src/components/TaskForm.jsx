import { useEffect, useState } from "react";

const emptyTask = { title: "", description: "" };

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [form, setForm] = useState(emptyTask);

  useEffect(() => {
    if (editingTask) {
      setForm({ title: editingTask.title, description: editingTask.description });
    } else {
      setForm(emptyTask);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
    setForm(emptyTask);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
        rows={2}
      />
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTask ? "Save changes" : "Add task"}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-ghost" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

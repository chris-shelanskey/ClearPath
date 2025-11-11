export function validateTask(task) {
  const errors = [];

  // Title
  if (!task.title || task.title.trim().length === 0) {
    errors.push("Title is required.");
  }

  // Importance: must be 1-5
  if (
    typeof task.importance !== "number" ||
    task.importance < 1 ||
    task.importance > 5
  ) {
    errors.push("Importance must be a number between 1 and 5.");
  }

  // Effort: must be a positive number
  if (
    typeof task.effort !== "number" ||
    task.effort < 0
  ) {
    errors.push("Effort must be a positive number.");
  }

  // Due Date: must be valid
  const dueDate = new Date(task.due_date);
  if (isNaN(dueDate.getTime())) {
    errors.push("Due date must be a valid date.");
  }

  return errors;
}

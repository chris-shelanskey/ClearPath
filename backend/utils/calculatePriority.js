export function calculatePriority(importance, due_date, effort) {
  const now = new Date();
  const due = new Date(due_date);

  // Calculate days until deadline
  const msInDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil((due - now) / msInDay);

  // Calculate urgency (closer deadline = higher urgency)
  const urgency = Math.max(0, 10 - daysLeft);

  // Combine into a score
  const priorityScore = (importance * 2) + urgency - effort;

  return priorityScore;
}

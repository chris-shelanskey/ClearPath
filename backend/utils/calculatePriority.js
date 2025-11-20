export function calculatePriority(importance, due_date, effort) {
  const now = new Date();
  const due = new Date(due_date);

  const msInDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil((due - now) / msInDay);

  const urgency = Math.max(0, 10 - daysLeft);

  const priorityScore = (importance * 2) + urgency - effort;

  return Math.max(priorityScore, 0);
}

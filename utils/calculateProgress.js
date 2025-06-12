export const calculateProgress = (goal) => {
  const totalCheckins =
    goal.Checkins?.reduce((sum, c) => sum + c.value, 0) || 0;
  const percentage = Math.min(
    100,
    (totalCheckins / goal.targetFrequency) * 100
  );

  return {
    current: totalCheckins,
    target: goal.targetFrequency,
    percentage,
    frequencyUnit: goal.frequencyUnit,
  };
};

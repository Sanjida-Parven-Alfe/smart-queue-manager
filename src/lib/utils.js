// Conflict detection logic: StartTime < NewEndTime AND NewStartTime < EndTime হলে conflict হবে।
export const checkConflict = (existingAppointments, newStart, newEnd) => {
  return existingAppointments.some(appt => {
    const start = new Date(appt.startTime);
    const end = new Date(appt.endTime);
    return newStart < end && start < newEnd;
  });
};
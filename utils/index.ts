export const checkIfMoreThanADay = (date:Date) => {
    if (!date) return false;
    const now = new Date();
    const lastDate = new Date(date); // Ensure date is converted to Date object
    const diffTime = Math.abs(now.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 1;
  };


export  const getPreviousDay = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  };
  
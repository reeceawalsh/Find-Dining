// formats the given time (1200) into (12:00 PM)
const formatTime = (time) => {
    const hour = parseInt(time.slice(0, 2), 10);
    const minute = time.slice(2);
    const formatted_hour = hour % 12 || 12;
    const am_pm = hour >= 12 ? "PM" : "AM";
    return `${formatted_hour}:${minute} ${am_pm}`;
};

export default formatTime;

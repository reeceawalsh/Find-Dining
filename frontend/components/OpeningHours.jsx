import styles from "./styles/openingHours.module.css";
import formatTime from "@component/lib/formatTime";

const OpeningHours = ({ hours }) => {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const groupHoursByDay = (hours) => {
        return hours.reduce((acc, curr) => {
            if (!acc[curr.day]) {
                acc[curr.day] = [];
            }
            acc[curr.day].push({ start: curr.start, end: curr.end });
            return acc;
        }, {});
    };

    const groupedHours = hours ? groupHoursByDay(hours[0].open) : {};

    return (
        <div className={styles.container}>
            <h2>Opening Hours</h2>
            {hours ? (
                <ul>
                    {Object.keys(groupedHours).map((day) => (
                        <li key={day}>
                            {days[day]}:{" "}
                            {groupedHours[day]
                                .map(
                                    (hour) =>
                                        `${formatTime(
                                            hour.start
                                        )} - ${formatTime(hour.end)}`
                                )
                                .join(" | ")}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    Opening hours are not currently available for this
                    restaurant.
                </p>
            )}
        </div>
    );
};

export default OpeningHours;

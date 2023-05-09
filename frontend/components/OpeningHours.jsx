import styles from "./styles/openingHours.module.css";
import formatTime from "@component/lib/formatTime";

// opening hours are provided as an array with numbered keys representing days, 0 being Monday and 1 being Tuesday. This component aims to format this array into a nice format. Sometimes the array will have multiple opening hours for the same day so there will be two arrays for each key. The formatTime helper function provides the AM and PM.

// example output -
// Monday 8:00 AM - 11:00 PM
// Tuesday 8:00 AM - 11:00 PM
// Wednesday 8:00 AM - 11:00 PM
// Thursday 8:00 AM - 11:00 PM
// Friday 8:00 AM - 12:00 AM
// Saturday 9:00 AM - 12:00 AM
// Sunday 9:00 AM - 11:00 PM
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
    // this function is used to group the opening hours by days into an object with keys representing each day of the week.
    const groupHoursByDay = (hours) => {
        return hours.reduce((acc, curr) => {
            if (!acc[curr.day]) {
                acc[curr.day] = [];
            }
            acc[curr.day].push({ start: curr.start, end: curr.end });
            return acc;
        }, {});
    };

    // groups the hours if they exist and provides an empty object if they don't.
    const groupedHours = hours ? groupHoursByDay(hours[0].open) : {};

    return (
        <div className={styles.container}>
            {hours ? (
                <ul>
                    {Object.keys(groupedHours).map((day) => (
                        <li key={day}>
                            <div className={styles.dayContainer}>
                                {days[day]}
                            </div>
                            <div className={styles.hourContainer}>
                                {groupedHours[day]
                                    // grouped hours object is mapped over and rendered with each day's opening hours formatted nicely using the formatTime function. If a day has multiple times they are joined together with a |.
                                    .map(
                                        (hour) =>
                                            `${formatTime(
                                                hour.start
                                            )} - ${formatTime(hour.end)}`
                                    )
                                    .join(" | ")}
                            </div>
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

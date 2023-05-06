import styles from "./styles/openingHours.module.css";
import formatTime from "@component/lib/formatTime";

// opening hours which get displayed on the restaurant page.
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

    return (
        <div className={styles.container}>
            <h2>Opening Hours</h2>
            {hours ? (
                <ul>
                    {hours[0].open.map((dayHours, index) => (
                        <li key={index}>
                            {days[dayHours.day]}: {formatTime(dayHours.start)} -{" "}
                            {formatTime(dayHours.end)}
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

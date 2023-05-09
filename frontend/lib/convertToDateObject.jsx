// converts a string to a Date.
const convertToDateObject = (dateStr) => {
    if (!dateStr) {
        return new Date(0);
    }
    console.log(dateStr);
    const [day, month, year, hour, minute] = dateStr.split(/[\s/:]+/);
    return new Date(year, month - 1, day, hour, minute);
};

export default convertToDateObject;

import axios from "axios";

// returns the list of restaurants that the user has marked as visited.
export default async function fetchHistory(id) {
    if (id) {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/getUserData?id=${id}`
            );
            return response.data.history;
        } catch (error) {
            console.error(error.message);
        }
    }
}

import { useCookies } from "react-cookie";

const useUnsetToken = () => {
    const [_, removeCookie] = useCookies(["jwt", "username", "id"]);
    console.log("unsetting token");
    const unsetToken = () => {
        removeCookie("jwt");
        removeCookie("username");
        removeCookie("id");
    };

    return unsetToken;
};

export default useUnsetToken;

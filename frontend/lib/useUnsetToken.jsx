import { useCookies } from "react-cookie";

const useUnsetToken = () => {
    const [_, removeCookie] = useCookies(["jwt", "username", "id"]);
    console.log("unsetting token");
    const unsetToken = () => {
        removeCookie("jwt", { path: "/" });
        removeCookie("username", { path: "/" });
        removeCookie("id", { path: "/" });
    };

    return unsetToken;
};

export default useUnsetToken;

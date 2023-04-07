import { useCookies } from "react-cookie";

const useSetToken = () => {
    const [_, setCookie] = useCookies(["jwt", "username"]);

    const setToken = (data) => {
        setCookie("jwt", data.jwt);
        setCookie("username", data.user.username);
    };

    return setToken;
};

export default useSetToken;

export default function accountDetailsUtil() {
    const handleClickConnected = (name) => {
        if (!checkConnected(name)) {
            const newConnected = [...connected, name];
            setConnected(newConnected);
        }

        // replace with put request to server
    };
    const checkConnected = (name) => {
        let found = false;
        connected.map((item) => {
            if (item == name) {
                found = true;
            }
        });

        return found;
    };
}

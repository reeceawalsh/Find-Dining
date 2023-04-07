import Navbar from "./Navbar";
import { UserProvider } from "@component/lib/authContext";

const Layout = ({ user, loading = false, children }) => (
    <UserProvider value={{ user, loading }}>
        <Navbar />
        <main>
            <div>{children}</div>
        </main>
    </UserProvider>
);

export default Layout;

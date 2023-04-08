import Navbar from "./Navbar";
import { UserProvider } from "@component/lib/authContext";
import MobileNavbar from "./MobileNavbar";

const Layout = ({ user, loading = false, children }) => (
    <UserProvider value={{ user, loading }}>
        <Navbar />
        <main>
            <div>{children}</div>
        </main>
        <MobileNavbar />
    </UserProvider>
);

export default Layout;

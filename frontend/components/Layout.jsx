import Navbar from "./Navbar";
import { UserProvider } from "@component/lib/authContext";
import MobileNavbar from "./MobileNavbar";

const Layout = ({ user, loading = false, children }) => (
    <UserProvider value={{ user, loading }}>
        <Navbar />
        <main>
            {loading ? <div className="spinner"></div> : <div>{children}</div>}
        </main>
    </UserProvider>
);

export default Layout;

import Navbar from "@component/components/MobileNavbar";
import AboutUs from "@component/components/AboutUs";
import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";

export default function About() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className="container">
                    <AboutUs className="about us main" style={{ minHeight: "100vh" }} />
            </div>
        </Layout>
    );
}

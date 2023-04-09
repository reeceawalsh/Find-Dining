import Header from "@component/components/Header";
import Navbar from "@component/components/MobileNavbar";
import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";

export default function AboutUs() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className="container">
                <Header name="About Us" />
                <div className="about us main" style={{ minHeight: "100vh" }}>
                    blah blah blah
                </div>
                <Navbar />
            </div>
        </Layout>
    );
}

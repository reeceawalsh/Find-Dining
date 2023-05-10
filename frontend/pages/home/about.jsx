import AboutUs from "@component/components/AboutUs";
import Layout from "@component/components/Layout";

// route -> /home/about
export default function About() {
    return (
        <Layout>
            <div className="container">
                <AboutUs />
            </div>
        </Layout>
    );
}

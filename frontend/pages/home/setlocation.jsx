import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";
import Header from "@component/components/Header";
import Map from "@component/components/Map";

export default function SetLocation() {
    const { user, loading } = useUser();

    return (
        <Layout user={user}>
            <div className="container">
                {/* <Header name="Set Location Page" /> */}
                <Map />
            </div>
        </Layout>
    );
}

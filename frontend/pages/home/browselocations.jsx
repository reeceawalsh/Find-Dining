import { useUser } from "@component/lib/authContext";
import Layout from "@component/components/Layout";
import Header from "@component/components/Header";
import Map from "@component/components/Map";

export default function BrowseLocation() {
    return (
        <Layout>
            <div className="container">
                <Map />
            </div>
        </Layout>
    );
}

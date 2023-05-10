import PrivacyNotice from "@component/components/PrivacyNotice";
import Layout from "@component/components/Layout";

// route -> home/privacypolicy
export default function PrivacyPolicy() {
    return (
        <Layout>
            <div className="container">
                <PrivacyNotice />
            </div>
        </Layout>
    );
}

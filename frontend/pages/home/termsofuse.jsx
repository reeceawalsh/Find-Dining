import TermsOfUse from "@component/components/TermsOfUse";
import Layout from "@component/components/Layout";

// route -> home/termsofuse
export default function Terms() {
    return (
        <Layout>
            <div className="container">
                <TermsOfUse />
            </div>
        </Layout>
    );
}

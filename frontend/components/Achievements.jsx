import Achievement from "@component/components/Achievement";
import Header from "@component/components/Header";
import Layout from "@component/components/Layout";
import { useUser } from "@component/lib/authContext";

export default function Achievements() {
    const { user, loading } = useUser();

    return (
        <div className="container">
            <Header name="Achievements" />
            <div className="info-section-container">
                <Achievement
                    title="Around the world"
                    description="Eat at a restaurant from every country"
                    date="23.march.1994"
                    progress="5/7"
                />
                <Achievement
                    title="dwadaw"
                    description="Edwadawdaw"
                    date="23.march.1994"
                    progress="5/7"
                />
                <Achievement
                    title="Stuff"
                    description="fdwafafwafwaf"
                    date="23.march.1994"
                    progress="5/7"
                />
                <Achievement
                    title="world"
                    description="Eat at a very country"
                    date="23.march.1994"
                    progress="5/7"
                />
                <Achievement
                    title=" thed"
                    description="Ecountry"
                    date="23.march.1994"
                    progress="5/7"
                />
                <Achievement
                    title="Around the world"
                    description="Eat at a restaurant from every country"
                    date="23.march.1994"
                    progress="5/7"
                />
                <Achievement
                    title="dwadaw"
                    description="Edwadawdaw"
                    date="23.march.1994"
                    progress="5/7"
                />
                <Achievement
                    title="Stuff"
                    description="fdwafafwafwaf"
                    date="23.march.1994"
                    progress="5/7"
                />
                <Achievement
                    title="world"
                    description="Eat at a very country"
                    date="23.march.1994"
                    progress="5/7"
                />
                <Achievement
                    title=" thed"
                    description="Ecountry"
                    date="23.march.1994"
                    progress="5/7"
                />
            </div>
        </div>
    );
}

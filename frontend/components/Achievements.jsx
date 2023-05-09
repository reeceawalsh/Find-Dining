import Achievement from "@component/components/Achievement";
import Header from "@component/components/Header";
import { useUser } from "@component/lib/authContext";

// NOT IN USE
// this component houses many achievements and is displayed on the profile page.
const Achievements = () => {
    // achievement data is currently manually entered but will be pulled from the database in the future.
    return (
        <div className="profileContainer">
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
};

export default Achievements;

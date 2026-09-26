import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:3000/api/users/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setProfile(response.data.profile);   //set profile

            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{profile.name}</h1>

            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Bio: {profile.bio}</p>

            <h3>Skills</h3>

            {profile.skills.map((skill, index) => (
                <p key={index}>{skill}</p>
            ))}

            <p>GitHub: {profile.github}</p>
            <p>LinkedIn: {profile.linkedin}</p>
        </div>
    );
};

export default Profile;
import { useEffect, useState } from "react";
import { useFetchUserProfile } from "../services/apiService";

const useProfileData = (profileUserId, profileData) => {
    const [profile, setProfile] = useState({});
    const [isCUProfile, setIsCUProfile] = useState(false);
    const fetchUserProfile = useFetchUserProfile();  // method for making api request for fetching user profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            if (profileData.id !== profileUserId) {
                try {
                    const data = await fetchUserProfile(profileUserId);
                    setProfile(data);
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            } else {
                setIsCUProfile(true);
                setProfile(profileData);
            }
        };

        fetchProfileData();
    }, [profileUserId, profileData]);

    return { profile, setProfile, isCUProfile };
};

export default useProfileData;
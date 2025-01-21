import { useEffect, useState } from "react";
import { useFetchUserProfile } from "../../services/apiService";

// for specific user profile page
const useProfileData = (profileUserId, profileData) => {
    const [profile, setProfile] = useState({});
    const [isCUProfile, setIsCUProfile] = useState(false);
    const fetchUserProfile = useFetchUserProfile();  // method for making api request for fetching user profile data
    const fetchProfileData = async () => {
        if (profileData.id !== profileUserId) {
            try {
                const data = await fetchUserProfile(profileUserId);
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
            setIsCUProfile(false);
        } else {
            setIsCUProfile(true);
            setProfile(profileData);
        }
    };

    useEffect(() => {
        if (profileUserId && Object.keys(profileData).length > 0) {
            fetchProfileData();
        }
    }, [profileUserId, profileData]);


    return { profile, setProfile, isCUProfile };
};

export default useProfileData;
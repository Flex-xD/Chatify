import { useAppStore } from "../../store";

const Profile = () => {
    const {userInfo}  = useAppStore();
    return (
        <div>
            profile:{userInfo.id}
            email:{userInfo.email}
        </div>
    )
}

export default Profile;

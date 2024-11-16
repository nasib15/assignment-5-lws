import ProfilePic from "../../assets/profile.png";
import useAuth from "../../hooks/useAuth";

const ProfileBanner = () => {
  const { auth } = useAuth();
  return (
    <div className="text-center mb-12">
      <img
        src={ProfilePic}
        alt="Profile Picture"
        className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
      />
      <p className="text-xl text-gray-600">Welcome</p>
      <h2 className="text-4xl font-bold text-gray-700 font-jaro">
        {auth?.user?.full_name}
      </h2>
    </div>
  );
};
export default ProfileBanner;

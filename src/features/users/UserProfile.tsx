import { useUserProfile } from "../../hooks/userHooks/useUserProfile";

const UserProfile = () => {
  const { data: userProfile, isLoading } = useUserProfile();
  console.log(userProfile);

  return (
    <div className="flex h-screen px-10 py-10">
      <div id="left" className="w-1/2 flex items-center justify-center">
        <div className="w-[80%] rounded-2xl overflow-hidden">
          <img src="/Images/userPic.jpg" alt="userPic" />
        </div>
      </div>
      <div
        id="right"
        className="w-1/2 flex flex-col items-center justify-center"
      >
        <p className="text-9xl font-fraunces">
          {userProfile?.data?.user?.firstName}
        </p>
        <p className="text-9xl font-fraunces">
          {userProfile?.data?.user?.lastName}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;

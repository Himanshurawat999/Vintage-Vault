import { Link } from "react-router";
import { useUserProfile } from "../../hooks/userHooks/useUserProfile";
import Modal from "../../components/adminComponent/Modal";
import { useState } from "react";
import UserForm from "../../components/userComponent/UserForm";
import NavBar from "../../components/userComponent/NavBar";

const UserProfile = () => {
  const { data: userProfile, isLoading } = useUserProfile();
  const [modalMode, setModalMode] = useState<"add" | null>(null);
  console.log(userProfile);

  const openAdd = () => {
    setModalMode("add");
  };

  const closeModal = () => {
    setModalMode(null);
  };

  const renderModalContent = () => {
    if (modalMode === "add") return <UserForm onSuccess={closeModal} />;
    return null;
  };

  return (
    <>
    <NavBar />
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
            {userProfile?.data?.user?.firstName}{" "}
            {userProfile?.data?.user?.lastName}
          </p>
          <div className="mt-10 flex flex-col gap-4">
            <button
              onClick={openAdd}
              className="cursor-pointer bg-zinc-100 hover:bg-zinc-200 px-12 py-2"
            >
              Update Profile
            </button>
            <Link
              to={"/wishlist"}
              className="cursor-pointer bg-zinc-100 hover:bg-zinc-200 px-12 py-2"
            >
              Wish List
            </Link>
            <Link
              to={"/orders-history"}
              className="cursor-pointer bg-zinc-100 hover:bg-zinc-200 px-12 py-2"
            >
              Order History
            </Link>
          </div>
        </div>

        <Modal isOpen={modalMode !== null} onClose={closeModal}>
          {renderModalContent()}
        </Modal>
      </div>
    </>
  );
};

export default UserProfile;

import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";
import { CgProfile } from "react-icons/cg";
import { IoMdNotifications } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white px-6 py-3 border-b flex justify-between items-center w-full">
      <div></div>
      <div className="flex items-center gap-4">
        
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <img
            src="/notifications.svg"
            alt="Notifications"
            className="w-5 h-5"
          />
        </div>
        <img
          src="/profile.png"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;

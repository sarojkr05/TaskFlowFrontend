import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import animatedLogo from "../assets/taskNav.json";
import Lottie from "lottie-react";
function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md px-6 py-4 flex items-center justify-around">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
          <Lottie
            animationData={animatedLogo}
            loop={true}
            alt="TaskFlow Logo"
            style={{ width: "30px", height: "30px" }} // Customize size here
          />{" "}
        </div>

        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>

        {user ? (
          <button
            onClick={handleLogout}
            className="relative inline-flex items-center justify-center me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Logout
            </span>
          </button>
        ) : (
          <Link
            to="/login"
            className="relative inline-flex items-center justify-center me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Login
            </span>
          </Link>
        )}
      </nav>

      {/* Add top padding to offset the fixed navbar height (e.g., 80px for safety) */}
      <div className="pt-20 min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
      </div>

      <Footer />
    </>
  );
}

export default Layout;

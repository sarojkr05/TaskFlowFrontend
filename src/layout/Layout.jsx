import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import animatedLogo from "../assets/taskNav.json";
import Lottie from "lottie-react";
import NotificationBell from "../components/NotificationBell";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between md:justify-around">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
          <Lottie
            animationData={animatedLogo}
            loop={true}
            alt="TaskFlow Logo"
            style={{ width: "30px", height: "30px" }}
          />
        </div>

        {/* Hamburger button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
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
        </ul>

        {/* Auth Button & Notification (Desktop only) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="relative inline-flex items-center justify-center me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
            >
              <span className="relative px-5 py-2.5 transition-all bg-white rounded-md group-hover:bg-transparent">
                Logout
              </span>
            </button>
          ) : (
            <Link
              to="/login"
              className="relative inline-flex items-center justify-center me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
            >
              <span className="relative px-5 py-2.5 transition-all bg-white rounded-md group-hover:bg-transparent">
                Login
              </span>
            </Link>
          )}

          <NotificationBell />
        </div>
      </nav>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full px-6 pb-4 z-40">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={() => setMenuOpen(false)}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/tasks" onClick={() => setMenuOpen(false)}>
                Tasks
              </Link>
            </li>
          </ul>

          {/* ✅ Notification Bell on Mobile */}
          <div className="mt-4 flex justify-start">
            <NotificationBell />
          </div>

          <div className="mt-4">
            {user ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="pt-20 min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
      </div>

      <Footer />
    </>
  );
}

export default Layout;

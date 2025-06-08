import { Link } from "react-router-dom";
import notFoundIllustration from "../assets/notFound.json";
import Lottie from "lottie-react";

function NotFound() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Left Text Content */}
      <div className="text-center lg:text-left flex flex-col items-center lg:items-start justify-center max-w-lg p-6">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </p>
        <p className="text-gray-600 mb-6">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>

      {/* Right Side Illustration */}
      <div className="w-full lg:w-[650px] max-w-md px-4">
        <Lottie animationData={notFoundIllustration} loop={true} />
      </div>
    </div>
  );
}

export default NotFound;

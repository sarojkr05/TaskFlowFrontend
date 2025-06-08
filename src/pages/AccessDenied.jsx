import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import accessDeniedIllustration from '../assets/accessDenied.json'

function AccessDenied() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="text-center lg:text-left flex flex-col items-center lg:items-start justify-center max-w-lg p-6">
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Access Denied
        </p>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.
        </p>
        <Link
          to="/"
          className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
        >
          Go Home
        </Link>
      </div>
      {/* Right Side Illustration */}
      <div className="w-full lg:w-[650px] max-w-md px-4">
        <Lottie animationData={accessDeniedIllustration} loop={true} />
      </div>
    </div>
  );
}

export default AccessDenied;

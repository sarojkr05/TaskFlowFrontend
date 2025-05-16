import Layout from "../layout/Layout";
import Lottie from "lottie-react";
import loginImg from "../assets/login.json";

function Login({ formData, handleSubmit, handleChange, isLoading }) {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4">
        {/* Form on the left side */}
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 lg:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              {isLoading ? "Loggin In..." : "LogIn"}
            </button>
          </form>
        </div>

        {/* Illustration on the right side (only on large screens) */}
        <div className="hidden lg:block px-8 w-[650px]">
          <Lottie animationData={loginImg} loop={true} />
        </div>
      </div>
    </Layout>
  );
}

export default Login;

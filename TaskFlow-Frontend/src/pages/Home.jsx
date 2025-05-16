import Layout from '../layout/Layout';
import Lottie from 'lottie-react';
import taskAnimation from '../assets/taskflow.json';

function Home() {
  return (
    <Layout>
      <section className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-[calc(102vh-160px)] px-4 text-center lg:text-left">
        {/* Lottie Animation - Left on large screens */}
        <div className="w-full max-w-md lg:mr-12">
          <Lottie animationData={taskAnimation} loop={true} />
        </div>

        {/* Text Content - Right on large screens */}
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight sm:text-6xl">
            Welcome to <span className="text-blue-600">TaskFlow</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600">
            Streamline your workflow, manage projects efficiently, and stay on top of your team's tasks — all in one place.
          </p>
          <button
            className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default Home;

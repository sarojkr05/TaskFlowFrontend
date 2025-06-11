// src/pages/ProjectsPage.jsx

import { Link } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { useGetAllProjectsQuery } from '../../features/projects/projectApi';

function ProjectsPage() {
  const { data, isLoading, error } = useGetAllProjectsQuery();
  const projects = data?.projects || [];

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">My Projects</h1>
          <Link to="/create-project" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Create Project
          </Link>
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Failed to load projects</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Link to={`/projects/${project._id}`} key={project._id} className="p-4 border rounded-lg shadow bg-white hover:shadow-md transition">
                <h2 className="text-xl font-bold mb-1">{project.name}</h2>
                <p className="text-sm text-gray-600">{project.description}</p>
              </Link>
            ))
          ) : (
            !isLoading && <p>No projects found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ProjectsPage;

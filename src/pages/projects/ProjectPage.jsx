// src/pages/ProjectsPage.jsx

import { Link } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { useGetAllProjectsQuery } from '../../features/projects/projectApi';
import { Loader2, FolderPlus, FolderOpen } from 'lucide-react';

function ProjectsPage() {
  const { data, isLoading, error } = useGetAllProjectsQuery();
  const projects = data?.projects || [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Projects</h1>
          <Link
            to="/create-project"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow transition"
          >
            <FolderPlus className="w-5 h-5" />
            <span>Create Project</span>
          </Link>
        </div>

        {/* Loading & Error States */}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="animate-spin w-5 h-5" />
            <span>Loading projects...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
            Failed to load projects. Please try again later.
          </div>
        )}

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Link
                to={`/projects/${project._id}`}
                key={project._id}
                className="group border p-5 rounded-lg shadow-sm hover:shadow-md bg-white transition transform hover:-translate-y-1"
              >
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {project.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {project.description}
                </p>
              </Link>
            ))
          ) : (
            !isLoading && (
              <div className="col-span-full text-center text-gray-500 mt-8">
                <FolderOpen className="mx-auto w-12 h-12 mb-2 text-gray-400" />
                <p className="text-lg">No projects found.</p>
                <p className="text-sm">Start by creating your first project.</p>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ProjectsPage;

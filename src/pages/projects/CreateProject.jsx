import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { useCreateProjectMutation } from '../../features/projects/projectApi';
import { toast } from 'sonner';

function CreateProjectPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createProject, { isLoading, error }] = useCreateProjectMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    try {
      const res = await createProject({ name, description }).unwrap();
      if (res.success) navigate('/projects');
      toast.success("Project created successfully :) ")
    } catch (err) {
      console.error('Create Project Error:', err);
      toast.error("Error creating project :( ")
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-xl">
        <h1 className="text-2xl font-semibold mb-4">Create New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter project description"
              required
              rows="4"
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm">Failed to create project</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default CreateProjectPage;

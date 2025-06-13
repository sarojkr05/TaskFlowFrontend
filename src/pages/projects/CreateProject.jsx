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
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-400"
            placeholder="Enter project name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-400"
            placeholder="Enter project description"
            required
          ></textarea>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm">Failed to create project</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  </div>
</Layout>

  );
}

export default CreateProjectPage;
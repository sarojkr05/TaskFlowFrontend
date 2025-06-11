import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProjectByIdQuery, useUpdateProjectMutation } from '../../features/projects/projectApi';
import Layout from '../../layout/Layout';

function EditProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProjectByIdQuery(projectId);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (data?.project) {
      setName(data.project.name);
      setDescription(data.project.description);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    try {
      await updateProject({ projectId, updatedData: { name, description } }).unwrap();
      navigate('/projects');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">Edit Project</h1>

        {isLoading ? (
          <p>Loading project...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load project</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isUpdating ? 'Updating...' : 'Update Project'}
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}

export default EditProjectPage;

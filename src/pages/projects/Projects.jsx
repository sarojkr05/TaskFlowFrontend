function Projects() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>

      <Link to="/projects/create" className="btn btn-primary mb-4">
        ➕ Create New Project
      </Link>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="p-4 border rounded-lg shadow">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-600">{project.description}</p>

              <div className="flex gap-2 mt-3">
                <Link to={`/projects/${project._id}`} className="btn btn-sm btn-info">
                  View
                </Link>
                <Link to={`/projects/${project._id}/edit`} className="btn btn-sm btn-warning">
                  Edit
                </Link>
                <button className="btn btn-sm btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects

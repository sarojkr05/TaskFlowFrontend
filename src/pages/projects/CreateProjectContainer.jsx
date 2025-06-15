// Container: src/containers/CreateProjectContainer.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateProjectMutation } from "../../features/projects/projectApi";
import CreateProjectPage from "../../pages/projects/CreateProject";

function CreateProjectContainer() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createProject, { isLoading, error }] = useCreateProjectMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    try {
      const res = await createProject({ name, description }).unwrap();
      if (res.success) navigate("/projects");
      toast.success("Project created successfully :) ");
    } catch (err) {
      console.error("Create Project Error:", err);
      toast.error("Error creating project :( ");
    }
  };

  return (
    <CreateProjectPage
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default CreateProjectContainer;

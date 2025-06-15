import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "../../features/projects/projectApi";
import EditProjectPage from "../../pages/projects/EditProjectPage";

function EditProjectContainer() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProjectByIdQuery(projectId);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
      navigate("/projects");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <EditProjectPage
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isUpdating={isUpdating}
      error={error}
    />
  );
}

export default EditProjectContainer;
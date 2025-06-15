import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddProjectMemberMutation,
  useGetProjectMembersQuery,
  useRemoveProjectMemberMutation,
} from "../../features/projects/projectApi";
import { toast } from "sonner";
import ManageProjectMembersPage from "../../pages/projects/ManageProjeceMembersPage";

function ManageProjectMembersContainer() {
  const { projectId } = useParams();
  const [email, setEmail] = useState("");

  const { data: memberData, isLoading: loadingMembers } = useGetProjectMembersQuery(projectId);
  const [addMember, { isLoading: adding }] = useAddProjectMemberMutation();
  const [removeMember] = useRemoveProjectMemberMutation();

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await addMember({ projectId, email }).unwrap();
      toast.success("Member added successfully!");
      setEmail("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add member");
    }
  };

  const handleRemove = async (userId) => {
    if (!confirm("Are you sure you want to remove this member?")) return;
    try {
      await removeMember({ projectId, userId }).unwrap();
      toast.success("Member removed successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to remove member");
    }
  };

  return (
    <ManageProjectMembersPage
      email={email}
      setEmail={setEmail}
      loadingMembers={loadingMembers}
      adding={adding}
      memberData={memberData}
      handleAddMember={handleAddMember}
      handleRemove={handleRemove}
    />
  );
}

export default ManageProjectMembersContainer;
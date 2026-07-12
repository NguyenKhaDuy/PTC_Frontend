import BranchCard from "./BranchCard";

export default function BranchGrid({ branches, onView, onEdit, onDelete }) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {branches.map((branch) => (
        <BranchCard
          key={branch.idBranch}
          branch={branch}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchFilter } from "@/components/admin/SearchFilter";
import { Pagination } from "@/components/admin/Pagination";
import { TeamMember } from "@/types/admin";
import { teamData } from "@/data/teamData";
import { TeamForm } from "@/components/admin/forms/TeamForm";
import { toast } from "sonner";

export default function Team() {
  const [data, setData] = useState<TeamMember[]>(teamData);
  const [filteredData, setFilteredData] = useState<TeamMember[]>(teamData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const itemsPerPage = 5;

  const columns: Column<TeamMember>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "position", label: "Position", sortable: true },
    { key: "department", label: "Department", sortable: true },
    { key: "email", label: "Email" },
    { key: "joinDate", label: "Join Date", sortable: true },
  ];

  const handleSearch = (query: string) => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleFilter = (filter: string) => {
    if (filter === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.department === filter);
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  };

  const handleEdit = (item: TeamMember) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: TeamMember) => {
    if (confirm(`Are you sure you want to remove "${item.name}" from the team?`)) {
      setData(data.filter((d) => d.id !== item.id));
      setFilteredData(filteredData.filter((d) => d.id !== item.id));
      toast.success("Team member removed successfully");
    }
  };

  const handleSave = (member: Partial<TeamMember>) => {
    if (editingItem) {
      const updated = data.map((item) =>
        item.id === editingItem.id ? { ...item, ...member } : item
      );
      setData(updated);
      setFilteredData(updated);
      toast.success("Team member updated successfully");
    } else {
      const newMember = {
        ...member,
        id: String(data.length + 1),
      } as TeamMember;
      setData([...data, newMember]);
      setFilteredData([...filteredData, newMember]);
      toast.success("Team member added successfully");
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filterOptions = [
    { value: "Creative", label: "Creative" },
    { value: "Post-Production", label: "Post-Production" },
    { value: "Audio", label: "Audio" },
    { value: "Localization", label: "Localization" },
    { value: "Visual Effects", label: "Visual Effects" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" data-aos="fade-down">
        <div>
          <h2 className="text-3xl font-bold">Team Members</h2>
          <p className="text-muted-foreground mt-1">Manage your team</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Team Member
        </Button>
      </div>

      <div data-aos="fade-up">
        <SearchFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          filterOptions={filterOptions}
          placeholder="Search team members..."
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="100">
        <DataTable
          data={paginatedData}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          idKey="id"
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <TeamForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        initialData={editingItem}
      />
    </div>
  );
}

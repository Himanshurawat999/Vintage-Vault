import React, { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../components/adminComponent/Modal";
import AddCategoryForm from "../../components/adminComponent/AddCategoryForm";
import { useCategories } from "../../hooks/userHooks/useCategories";
import { useNavigate, useSearchParams } from "react-router";
import EditCategory from "../../components/adminComponent/EditCategory";
import { useDeleteCategory } from "../../hooks/adminHooks/useDeleteCategory";

type ModalMode = "add" | "edit" | null;

const AdminCategory: React.FC = () => {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();

  const { data: categoriesData } = useCategories();
  const { mutate: deleteCateroy } = useDeleteCategory();
  console.log(categoriesData);

  const openAdd = () => {
    setModalMode("add");
  };

  const openEdit = (id: string) => {
    setSearchParams({ id });
    setModalMode("edit");
  };

  const handleDelete = (id: string) => {
    deleteCateroy({ id: id });
  };

  const closeModal = () => {
    setModalMode(null);
    setSearchParams()
  };

  const renderForm = () => {
    if (modalMode === "add") {
      return <AddCategoryForm />;
    }
    if (modalMode === "edit") {
      return <EditCategory />;
    }
    return null;
  };

  return (
    <div className="mx-auto px-4 pt-6 md:pt-12 mb-10 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end">
        <h3 className="font-fraunces font-light text-2xl md:text-3xl lg:text-5xl mb-8 md:mb-12">
          Category
        </h3>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 p-1 bg-zinc-300 hover:bg-orange-500 text-zinc-900 rounded cursor-pointer"
        >
          <Plus className="w-5 h-4" />
          <span className="text-sm">Add Category</span>
        </button>
      </div>

      <Modal isOpen={modalMode !== null} onClose={closeModal}>
        {renderForm()}
      </Modal>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categoriesData?.data?.categories?.map((category: any) => (
              <tr
                key={category.id}
                className="border-b border-zinc-400 hover:bg-zinc-100"
              >
                <td>{category.name}</td>
                <td>
                  <span
                    className="text-lime-500 cursor-pointer"
                    onClick={() => openEdit(category.id)}
                  >
                    Edit
                  </span>
                </td>
                <td>
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategory;

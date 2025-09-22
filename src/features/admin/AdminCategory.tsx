import React, { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../components/adminComponent/Modal";
import AddCategoryForm from "../../components/adminComponent/AddCategoryForm";
import { useCategories } from "../../hooks/userHooks/useCategories";
import { useSearchParams } from "react-router";
import EditCategory from "../../components/adminComponent/EditCategory";
import LoadingScreen from "../../components/userComponent/LoadingScreen";
import DeleteConfirmation from "../../components/adminComponent/DeleteConfirmation";
import { useDeleteCategory } from "../../hooks/adminHooks/useDeleteCategory";

type ModalMode = "add" | "edit" | "delete" | null;

const AdminCategory: React.FC = () => {
  document.title = `Vintage Vault | Admin Category`;

  const [status, setStatus] = useState<string>("true");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [curId, setCurId] = useState<string>("");
  const [, setSearchParams] = useSearchParams();

  const { data: categoriesData, isLoading: categoriesDataLoading } =
    useCategories(status);
  const { mutate: deleteCateroy } = useDeleteCategory();
  console.log(categoriesData);

  const openAdd = () => {
    setModalMode("add");
  };

  const openEdit = (id: string) => {
    setSearchParams({ id });
    setModalMode("edit");
  };

  const openDelete = (id: string) => {
    setModalMode("delete");
    setCurId(id);
  };

  const handleDelete = () => {
    deleteCateroy({ id: curId });
  };

  const closeModal = () => {
    setModalMode(null);
    setSearchParams();
  };

  const handleSeleted = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  const renderForm = () => {
    if (modalMode === "add") {
      return <AddCategoryForm onSuccess={closeModal} />;
    }
    if (modalMode === "edit") {
      return <EditCategory onSuccess={closeModal} status={status} />;
    }
    if (modalMode === "delete") {
      return (
        <DeleteConfirmation
          onSuccess={closeModal}
          id={curId}
          onDelete={handleDelete}
        />
      );
    }
    return null;
  };

  return categoriesDataLoading ? (
    <LoadingScreen />
  ) : (
    <div className="mx-auto px-4 pt-6 md:pt-12 mb-10 sm:px-6 lg:px-8">
      <h3 className="font-fraunces font-light text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6">
        Category
      </h3>

      <div className="flex justify-between items-end mb-4 md:mb-6">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 p-1 bg-zinc-300 hover:bg-orange-500 text-zinc-900 rounded cursor-pointer"
        >
          <Plus className="w-5 h-4" />
          <span className="text-sm">Add Category</span>
        </button>

        <fieldset className="custom-fieldset">
          <select
            defaultValue={"true"}
            onChange={(e) => handleSeleted(e)}
            className="custom-input"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </fieldset>
      </div>

      <Modal isOpen={modalMode !== null} onClose={closeModal}>
        {renderForm()}
      </Modal>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Edit</th>
              {status === "true" && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {categoriesData?.data?.categories?.map((category: any) => (
              <tr
                key={category.id}
                className="border-b border-zinc-400 hover:bg-zinc-100"
              >
                <td>{category.name}</td>
                <td>{category.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <span
                    className="text-lime-500 cursor-pointer"
                    onClick={() => openEdit(category.id)}
                  >
                    Edit
                  </span>
                </td>
                {status === "true" && (
                  <td>
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={() => openDelete(category.id)}
                    >
                      Delete
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategory;

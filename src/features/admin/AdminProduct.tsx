import React, { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../components/adminComponent/Modal";
import AddProductForm from "../../components/adminComponent/AddProductForm";
import EditProductForm from "../../components/adminComponent/EditProductForm";
import { useSearchParams } from "react-router";
import { useDeleteProduct } from "../../hooks/adminHooks/useDeleteProduct";
import { useProductsData } from "../../hooks/userHooks/useProductsData";
import LoadingScreen from "../../components/userComponent/LoadingScreen";
import DeleteConfirmation from "../../components/adminComponent/DeleteConfirmation";

type ModalMode = "add" | "edit" | "delete" | null;

const AdminProduct: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [curId, setCurId] = useState<string>("");
  const [_, setSearchParams] = useSearchParams();

  const { data: productsData, isLoading: productsDataLoading } =
    useProductsData(isActive);
  const { mutate: deleteProduct } = useDeleteProduct();
  // console.log(productsData);

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
    deleteProduct({ id: curId });
  };

  const closeModal = () => {
    setModalMode(null);
    setSearchParams();
  };

  const handleSeleted = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    let tempBoolean = e.target.value === "true" ? true : false
    console.log(tempBoolean)
    setIsActive(tempBoolean);
  };

  const renderForm = () => {
    if (modalMode === "add") {
      return <AddProductForm onSuccess={closeModal} />;
    }
    if (modalMode === "edit") {
      return <EditProductForm onSuccess={closeModal} status={isActive}/>;
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

  return productsDataLoading ? (
    <LoadingScreen />
  ) : (
    <div className="mx-auto px-4 pt-6 md:pt-12 mb-10 sm:px-6 lg:px-8">
      <h3 className="font-fraunces font-light text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6">
        Products
      </h3>

      <div className="flex justify-between items-end mb-4 md:mb-6">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 p-1 bg-zinc-300 hover:bg-orange-500 text-zinc-900 rounded cursor-pointer"
        >
          <Plus className="w-5 h-4" />
          <span className="text-sm">Add Product</span>
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
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Edit</th>
              {isActive === true && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {productsData?.data?.products?.map((product: any) => (
              <tr
                key={product.id}
                className="border-b border-zinc-400 hover:bg-zinc-100"
              >
                <td>{product.name}</td>
                <td>{product.category.name}</td>
                <td>{parseFloat(product.price).toFixed(2)}</td>
                <td>{product.inventoryQuantity}</td>
                <td>
                  <span
                    className="text-lime-500 cursor-pointer"
                    onClick={() => openEdit(product.id)}
                  >
                    Edit
                  </span>
                </td>
                {isActive === true && (
                  <td>
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={() => openDelete(product.id)}
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

export default AdminProduct;

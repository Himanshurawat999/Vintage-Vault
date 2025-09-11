import React, { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../components/adminComponent/Modal";
import AddProductForm from "../../components/adminComponent/AddProductForm";
import EditProductForm from "../../components/adminComponent/EditProductForm";
import { useSearchParams } from "react-router";
import { useDeleteProduct } from "../../hooks/adminHooks/useDeleteProduct";
import { useProductsData } from "../../hooks/userHooks/useProductsData";

type ModalMode = "add" | "edit" | null;

const AdminProduct: React.FC = () => {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [_, setSearchParams] = useSearchParams();

  const { data: productsData } = useProductsData();
  const { mutate: deleteProduct } = useDeleteProduct();
  console.log(productsData)

  const openAdd = () => {
    setModalMode("add");
  };

  const openEdit = (id: string) => {
    setSearchParams({ id });
    setModalMode("edit");
  };

  const handleDelete = (id: string) => {
    deleteProduct({ id });
  };

  const closeModal = () => {
    setModalMode(null);
    setSearchParams();
  };

  const renderForm = () => {
    if (modalMode === "add") {
      return <AddProductForm />;
    }
    if (modalMode === "edit") {
      return <EditProductForm />;
    }
    return null;
  };

  // return (
  //   <div className="mx-auto px-4 pt-6 md:pt-12 mb-10 sm:px-6 lg:px-8">
  //     <div className="flex justify-between items-end">
  //       <h3 className="font-fraunces font-light text-2xl md:text-3xl lg:text-5xl mb-8 md:mb-12">
  //         Products
  //       </h3>
  //       <button
  //         onClick={openAdd}
  //         className="flex items-center gap-2 p-1 bg-zinc-300 hover:bg-orange-500 text-zinc-900 rounded cursor-pointer"
  //       >
  //         <Plus className="w-5 h-4" />
  //         <span className="text-sm">Add Product</span>
  //       </button>
  //     </div>

  //     <Modal isOpen={modalMode !== null} onClose={closeModal}>
  //       {renderForm()}
  //     </Modal>

  //     <div className="overflow-x-auto">
  //       <table className="table">
  //         <thead>
  //           <tr>
  //             <th>Name</th>
  //             <th>Edit</th>
  //             <th>Delete</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {productsData?.data?.products?.map((product: any) => (
  //             <tr
  //               key={product.id}
  //               className="border-b border-zinc-400 hover:bg-zinc-100"
  //             >
  //               <td>{product.name}</td>
  //               <td>
  //                 <span
  //                   className="text-lime-500 cursor-pointer"
  //                   onClick={() => openEdit(product.id)}
  //                 >
  //                   Edit
  //                 </span>
  //               </td>
  //               <td>
  //                 <span
  //                   className="text-red-500 cursor-pointer"
  //                   onClick={() => handleDelete(product.id)}
  //                 >
  //                   Delete
  //                 </span>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
};

export default AdminProduct;

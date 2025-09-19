const DeleteConfirmation = ({ onSuccess, id, onDelete }: { onSuccess: () => void, id:string, onDelete:() => void }) => {
    

    const handleConfirmDelete = () => {
    
    onSuccess();
    onDelete();
  };

  console.log("delete : ",id)

    return (
        <div className="w-full flex flex-col items-center gap-8 -ml-5">
          <p className="text-zinc-800 text-3xl">Are you sure!</p>
          <div>
            <button
              className="btn bg-red-300 rounded-sm mr-4"
              style={{ border: "none" }}
              onClick={handleConfirmDelete}
            >
              Yes
            </button>
            <button
              className="btn bg-lime-300 rounded-sm "
              style={{ border: "none" }}
              onClick={onSuccess}
            >
              No
            </button>
          </div>
        </div>
      );
}

export default DeleteConfirmation
"use client"
interface DeleteModalProps {
    onDelete: () => void;
    onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onDelete, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this user?</h2>
                <div className="flex justify-center mt-8">
                    <button onClick={onCancel} className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onClick={onDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;

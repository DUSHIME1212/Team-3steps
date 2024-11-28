import { useState } from 'react';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
    const [categoryName, setCategoryName] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        // Call API to save category (Add/Update)
        console.log('Saving Category:', categoryName);
        onClose(); // Close modal after saving
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h3 className="text-xl font-semibold text-gray-700">Add/Edit Category</h3>
                <div className="mt-4">
                    <label className="block text-gray-600">Category Name</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="mt-2 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Category Name"
                    />
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="ml-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;

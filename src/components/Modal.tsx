import { Dispatch, SetStateAction } from "react";

interface ModalProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    onConfirm: () => void;
    title: string;
    message: string;
}

const Modal = ({ show, setShow, onConfirm, title, message }: ModalProps) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p>{message}</p>
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => {
                            onConfirm();
                            setShow(false);
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

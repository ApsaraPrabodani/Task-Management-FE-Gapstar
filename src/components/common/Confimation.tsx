import React, { useState, useMemo } from "react";
import Modal from 'react-bootstrap/Modal';

interface ConformationProps {
    showConfirmationModal: boolean,
    setShowCofirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: any
}

const Confirmation: React.FC<ConformationProps> = ({showConfirmationModal, setShowCofirmationModal, handleSubmit}) => {
    if (!showConfirmationModal) return null; 
    return (
        
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                {/* Modal Content */}
                <h2 className="text-lg font-semibold text-gray-900">Are you sure you want to delete?</h2>
                
                {/* Modal Actions */}
                <div className="flex justify-end gap-2 mt-4">
                    <button 
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        onClick={() => setShowCofirmationModal(false)}
                    >
                        Cancel
                    </button>
                    <button 
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        onClick={handleSubmit}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

};
export default Confirmation;

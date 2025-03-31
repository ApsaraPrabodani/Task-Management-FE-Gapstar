import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-0">
      <div className="border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;

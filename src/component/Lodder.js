import React from "react";

const Lodder = ({ message }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-white bg-opacity-90 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/lodder.gif" // ✅ Correct usage
            alt="Loading..."
            className="w-24 h-24 mx-auto mb-4"
          />
          <p className="text-lg font-semibold text-gray-700">{message}</p>
        </div>
      </div>
    </>
  );
};

export default Lodder;

import React, { useState, useEffect } from 'react';

const SuccesMessage = ({ message }) => {
  const [showSucces, setShowSucces] = useState(false);

  useEffect(() => {
    if (message) {
      setShowSucces(true);
      const timer = setTimeout(() => {
        setShowSucces(false);
      }, 3000);  // 3 másodperc után eltűnik a hibaüzenet
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`z-50 fixed top-1/2 left-1/2 transform bg-green-700/95 text-white p-4 rounded-lg shadow-lg transition-all duration-1000 ease-in-out`}
      style={{
        opacity: showSucces ? 1 : 0,
        transform: showSucces ? 'translate(-50%, -50%)' : 'translate(-50%, -100%)',
      }}
    >
      {message}
    </div>
  );
};

export default SuccesMessage;

import React, { useState, useEffect } from 'react';

const ErrorMessage = ({ message }) => {
  const [showError, setShowError] = useState(0);

  useEffect(() => {
    if (message) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);  // 3 másodperc után eltűnik a hibaüzenet
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`z-10 fixed top-1/2 left-1/2 bg-red-700/95 text-white p-4 rounded-lg shadow-lg duration-1000 ease-in-out`}
      style={{
        opacity: showError ? 1 : 0,
        transform: showError ? 'translate(-50%, -50%)' : 'translate(-50%, -100%)',
      }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;

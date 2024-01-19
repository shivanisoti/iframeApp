// ChildApp.js

import React, { useEffect } from 'react';

const ChildApp = () => {
  useEffect(() => {
    // Function to be called from the parent
    window.myFunctionInIframe = () => {
      console.log('Function in iframe called');
      // Send a message back to the parent indicating that the function was executed
      window.parent.postMessage('FunctionExecuted', 'http://localhost:3000');
    };

    // Listen for messages from the parent
    const handleMessage = (event) => {
      if (event.data === 'callMyFunctionInIframe') {
        // Call the function when the appropriate message is received
        window.myFunctionInIframe();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      // Clean up event listener on unmount
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div>
      <h1>Child (Iframe) App</h1>
    </div>
  );
};

export default ChildApp;

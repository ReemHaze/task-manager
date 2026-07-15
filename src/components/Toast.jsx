import { useEffect } from 'react';

function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 2000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-sm px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  );
}

export default Toast;
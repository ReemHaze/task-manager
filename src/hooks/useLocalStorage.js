import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
   try{
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
        return initialValue;
    }
    return JSON.parse(storedValue);
   } catch(error) {
    console.error('Error reading localStorage key:', key, error);
    return initialValue;
   }

  });

  useEffect(() => {
    try{
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage key:' , key, error);
    }
  }, [key, value]
);

  return [value, setValue];
}

export default useLocalStorage;
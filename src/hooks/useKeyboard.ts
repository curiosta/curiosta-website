import { useEffect } from "preact/hooks";

type Key = 'ControlLeft' | 'ControlRight' | 'Delete' | 'Enter' | 'Escape' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' | 'Help' | 'Home' | 'Insert' | 'Space' | 'Tab' | '/';

type Listener = () => void;

const useKeyboard = (key: Key, event: 'keydown' | 'keyup' = 'keydown') => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        event.preventDefault(); // Prevent the default action of the key press event
        listeners.forEach((listener) => listener());
      }
    };

    if (event === 'keydown') {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.addEventListener('keyup', handleKeyDown);
    }

    return () => {
      if (event === 'keydown') {
        document.removeEventListener('keydown', handleKeyDown);
      } else {
        document.removeEventListener('keyup', handleKeyDown);
      }
    };
  }, [key, event]);

  const listeners: Listener[] = [];

  const addListener = (listener: Listener) => {
    listeners.push(listener);
  };

  const removeListener = (listener: Listener) => {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };

  return { addListener, removeListener };
};

export default useKeyboard;

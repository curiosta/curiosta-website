import { useEffect } from "preact/hooks";

type Key = 'ControlLeft' | 'ControlRight' | 'Delete' | 'Enter' | 'Escape' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' | 'Help' | 'Home' | 'Insert' | 'Space' | 'Tab';

type TOptions = {
  event: 'keyup' | 'keydown' | 'keypress';
}
const useKeyboard = (key: Key, { event = 'keydown' }: TOptions) => {
  const events: Record<Partial<Key>, Record<string, Function>> | Record<any, any> = {};
  const listener = (event: KeyboardEvent) => {
    if (event.key === key) {
      const callbackKeys = Object.keys(events[key]);
      const callbacks = callbackKeys.map((cbKey) => events[key][cbKey]);
      callbacks.forEach((cb) => {
        cb()
      });
    }
  }
  useEffect(() => {
    document.addEventListener(event, listener);
    return () => {
      document.removeEventListener(event, listener)
    }
  }, []);

  const add = (id: string, callback: Function) => {
    events[key] = { [id]: callback };
  }
  const remove = (id: string) => {
    delete events[key][id];
  }

  return { add, remove }
}

export default useKeyboard
import '@testing-library/jest-dom';

const localStorageMock = (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      removeItem(key) {
        delete store[key];
      },
      clear() {
        store = {};
      }
    };
  })();
  
  // Mock the global localStorage object on window
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });
  
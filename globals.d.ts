interface Chrome {
  tabs: {
    query: (queryInfo: object, callback: (tabs: any[]) => void) => void;
  };
}

declare global {
  interface Window {
    chrome: Chrome;
  }
}
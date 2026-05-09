/// <reference types="react-scripts" />

interface Document {
  startViewTransition(callback: () => void): {
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
    finished: Promise<void>;
    skipTransition(): void;
  };
}

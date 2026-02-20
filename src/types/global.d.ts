export {};

declare global {
  interface Window {
    AF_SMART_SCRIPT?: {
      fireImpressionsLink?: () => void;
    };
  }
}
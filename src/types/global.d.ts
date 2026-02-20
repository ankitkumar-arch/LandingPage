export {};

declare global {
  interface AFSmartScriptParams {
    oneLinkURL: string;
    webReferrer?: string;
    afParameters?: {
      mediaSource?: { keys?: string[]; defaultValue?: string };
      campaign?: { keys?: string[]; defaultValue?: string };
      afSub1?: { keys?: string[]; defaultValue?: string };
      ad?: { keys?: string[]; defaultValue?: string };
      adSet?: { keys?: string[]; defaultValue?: string };
      afSub2?: { keys?: string[]; defaultValue?: string };
      afSub3?: { keys?: string[]; defaultValue?: string };
      afSub4?: { keys?: string[]; defaultValue?: string };
      afCustom?: {
        paramKey: string;
        defaultValue?: string;
        keys?: string[];
      }[];
    };
  }

  interface AFSmartScriptResult {
    clickURL?: string;
  }

  interface Window {
    AF_SMART_SCRIPT?: {
      fireImpressionsLink?: () => void;
      generateOneLinkURL?: (
        params: AFSmartScriptParams
      ) => AFSmartScriptResult;
    };
  }
}
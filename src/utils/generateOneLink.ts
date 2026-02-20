let smartScriptReady: Promise<void> | null = null;

function waitForSmartScript() {
  if (smartScriptReady) return smartScriptReady;

  smartScriptReady = new Promise((resolve) => {
    if (window.AF_SMART_SCRIPT) {
      resolve();
      return;
    }

    const interval = setInterval(() => {
      if (window.AF_SMART_SCRIPT) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });

  return smartScriptReady;
}

export async function generateAFOneLink(baseOneLink: string) {
  await waitForSmartScript();

  const result = window.AF_SMART_SCRIPT.generateOneLinkURL({
    oneLinkURL: baseOneLink,
    webReferrer: "af_channel",
    afParameters: {
      mediaSource: { keys: ["utm_source"], defaultValue: "skillz_web" },
      campaign: { keys: ["utm_campaign"], defaultValue: "skillz_web" },
      afSub1: { keys: ["utm_medium"] },
      ad: { keys: ["utm_content"] },
      adSet: { keys: ["utm_term"] },
      afSub2: { keys: ["utm_webpage"] },
      afSub3: { keys: ["utm_pdp_exp"] },
      afSub4: { keys: ["fbclid"] },
      afCustom: [
        { paramKey: "af_ss_ui", defaultValue: "true" },
        { paramKey: "is_retargeting", defaultValue: "true" },
        { paramKey: "clickid", keys: ["clickid"] },
      ],
    },
  });

  return result;
}

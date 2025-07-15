let intervalId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "start") {
    if (intervalId !== null) return;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab || !tab.url.startsWith("http")) return;

      intervalId = setInterval(() => {
        chrome.tabs.create({ url: tab.url }); // باز کردن تب جدید
        chrome.tabs.reload(tab.id);           // رفرش تب فعلی
      }, 2000);

      sendResponse({ status: "started" });
    });

    return true;
  }

  if (message.command === "stop") {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      sendResponse({ status: "stopped" });
    }
  }
});

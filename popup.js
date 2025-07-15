document.getElementById("startBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "start" }, (response) => {
    console.log(response?.status);
  });
});

document.getElementById("stopBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "stop" }, (response) => {
    console.log(response?.status);
  });
});

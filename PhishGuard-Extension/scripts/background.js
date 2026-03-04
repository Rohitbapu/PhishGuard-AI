const API_URL = "http://127.0.0.1:8000/check";

chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.action === "check_url") {
        chrome.storage.local.get(['filterDisabled', 'allowlist'], (data) => {
            // If user turned OFF protection in popup, do nothing
            if (data.filterDisabled === true) return;

            // Extract domain to check against Allowlist
            try {
                const domain = new URL(request.url).hostname.replace('www.', '');
                if (data.allowlist && data.allowlist.includes(domain)) return;
            } catch (e) { return; }

            // Send to Python Backend
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: request.url })
            })
            .then(res => res.json())
            .then(resData => {
                if (resData.is_phishing) {
                    chrome.tabs.sendMessage(sender.tab.id, { 
                        action: "flag", 
                        url: request.url 
                    });
                }
            })
            .catch(err => console.log("Backend Offline or Error:", err));
        });
    }
});
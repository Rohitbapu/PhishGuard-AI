document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const toggleBtn = document.getElementById('main-toggle');
    const allowBtn = document.getElementById('add-allowlist');

    // 1. Check if Backend is alive
    fetch("http://127.0.0.1:8000/check", { method: "OPTIONS" })
        .then(() => {
            dot.classList.add('online');
            statusText.innerText = "CONNECTED";
        }).catch(() => {
            statusText.innerText = "OFFLINE";
        });

    // 2. Toggle Protection ON/OFF
    chrome.storage.local.get(['filterDisabled'], (res) => {
        let disabled = res.filterDisabled || false;
        toggleBtn.innerText = disabled ? "Protection: OFF" : "Protection: ON";
        if (disabled) toggleBtn.style.background = "#f43f5e";
    });

    toggleBtn.addEventListener('click', () => {
        chrome.storage.local.get(['filterDisabled'], (res) => {
            const newState = !res.filterDisabled;
            chrome.storage.local.set({ filterDisabled: newState }, () => {
                toggleBtn.innerText = newState ? "Protection: OFF" : "Protection: ON";
                toggleBtn.style.background = newState ? "#f43f5e" : "#2d3748";
            });
        });
    });

    // 3. Add Current Domain to Allowlist
    allowBtn.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const domain = new URL(tabs[0].url).hostname.replace('www.', '');
            chrome.storage.local.get(['allowlist'], (res) => {
                const list = res.allowlist || [];
                if (!list.includes(domain)) {
                    list.push(domain);
                    chrome.storage.local.set({ allowlist: list }, () => {
                        allowBtn.innerText = "✅ Added to Safe List";
                        setTimeout(() => location.reload(), 1500);
                    });
                }
            });
        });
    });
});
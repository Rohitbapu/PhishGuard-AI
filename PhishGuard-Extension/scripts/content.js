// Function to send a URL to the background script
const checkLink = (url) => {
    if (url && url.startsWith('http')) {
        chrome.runtime.sendMessage({ action: "check_url", url: url });
    }
};

// 1. Scan all existing links on the page immediately
document.querySelectorAll('a[href]').forEach(a => checkLink(a.href));

// 2. Watch for NEW links (for dynamic sites like Gmail/Amazon)
const observer = new MutationObserver((mutations) => {
    mutations.forEach(m => {
        m.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Ensure it's an element
                const links = node.tagName === 'A' ? [node] : node.querySelectorAll('a[href]');
                links.forEach(a => checkLink(a.href));
            }
        });
    });
});
observer.observe(document.body, { childList: true, subtree: true });

// 3. Listen for the 'flag' command to highlight threats
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "flag") {
        const links = document.querySelectorAll(`a[href="${msg.url}"]`);
        links.forEach(l => {
            l.style.outline = "2px dashed #f43f5e";
            l.style.backgroundColor = "rgba(244, 63, 94, 0.1)";
        });
    }
});
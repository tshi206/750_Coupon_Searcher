// chrome.runtime.onMessage.addListener ::
//  cb: ((message: any, sender: MessageSender, sendResponse: (response: any) => void) => void) => void
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.todo === "showPageAction"){
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.pageAction.show(tabs[0].id)
        })
    }
    console.log(`sender: ${sender}, sendResponse: ${sendResponse}`)
});

// create context menu items
let contextMenuSearchItem = {
    "id": "search",
    // "title" - title that appears on the context menu (right-click menu)
    "title": "Search coupons",
    // "contexts" - under what circumstances should the extension appear in the context menu
    // "selection" - extension only appears in the context menu when the user selects something
    "contexts": ["selection"]
};
let contextMenuOptionsItem = {
    "id": "options",
    // "title" - title that appears on the context menu (right-click menu)
    "title": "Search coupons options..."
};
let contextMenuOptionsItemWithTextSelection = {
    "id": "optionsWithTextSelection",
    // "title" - title that appears on the context menu (right-click menu)
    "title": "Search coupons options...",
    // "contexts" - under what circumstances should the extension appear in the context menu
    // "selection" - extension only appears in the context menu when the user selects something
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuSearchItem);
chrome.contextMenus.create(contextMenuOptionsItem);
chrome.contextMenus.create(contextMenuOptionsItemWithTextSelection);

chrome.contextMenus.onClicked.addListener((clickData) => {
    if (clickData.menuItemId === "options" || clickData.menuItemId === "optionsWithTextSelection"){
        chrome.tabs.create({ url: "options.html" });
    } else if (clickData.menuItemId === "search" && clickData.selectionText) {
        console.log("Text selection : " + clickData.selectionText);
        // todo - search handler
    }
});
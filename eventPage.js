// chrome.runtime.onMessage.addListener ::
//  cb: ((message: any, sender: MessageSender, sendResponse: (response: any) => void) => void) => void
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.todo === "showPageAction"){
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.pageAction.show(tabs[0].id)
        })
    } else if (message.action === "select") {
        // todo - request to api to get the results, store the results in sync storage
        chrome.storage.sync.set({msg: message.msg}, () => {
            chrome.windows.create({type: "popup", url: "popupOnSelection.html", width: 400, height: 600}, (window) => {
                console.log(window.id);
                console.log("window created");
            });
        });
    }
    //console.log(`sender: ${sender}, sendResponse: ${sendResponse}`)
});

console.log("event page ready");

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
        let popups = chrome.extension.getViews({type: "popup"});
        if (popups.length !== 0) {
            let popup = popups[0];
            popup.clickSearchBtn();
        }
        notify();
    }
});

/**
 * generate a notification if the search is invoked FROM the context menu.
 * (after implementing the search handler, put this in the callback)
 */
let notify = () => {
    let notifOptions = {
        type: 'image',
        iconUrl: 'resources/icon_enlarged.png',
        imageUrl: "resources/my_favourite.png",
        title: 'Search Launched!',
        message: "Your search has been launched. Click on our icon to see the results!"
    };
    chrome.notifications.create('searchNotif', notifOptions)
};
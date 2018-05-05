// chrome.runtime.onMessage.addListener ::
//  cb: ((message: any, sender: MessageSender, sendResponse: (response: any) => void) => void) => void
chrome.runtime.onMessage.addListener((message) => {
    if (message.todo === "showPageAction"){
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.pageAction.show(tabs[0].id)
        })
    } else if (message.action === "select") {
        let isPopupOnSelect;
        chrome.storage.sync.get(['isPopupOnSelect'], flag => {
            if(flag.isPopupOnSelect == null){flag.isPopupOnSelect=true;}
            isPopupOnSelect = flag.isPopupOnSelect ? flag.isPopupOnSelect : false;
            let histories;
            chrome.storage.sync.get(['history'], (obj) => {
                histories = obj.history ? obj.history : [];
                histories.push(message.msg); // this is used as a stack, to retrieve items use array.pop();
                console.log(histories); // use it for debugging if needed
                chrome.storage.sync.set({history: histories}, () => {
                    if (isPopupOnSelect) {
                        chrome.windows.create({type: "popup",
                            url: "https://www.amazon.com/s/ref=nb_sb_noss?url=srs%3D2231352011%26search-alias%3Dcoupons&field-keywords="
                            + message.msg, width: 1024, height: 600}, (window) => {
                            console.log(window.id);
                            console.log("window created");
                        });
                    }
                });
            });
        });
    }
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
        let histories;
        chrome.storage.sync.get(['history'], (obj) => {
            histories = obj.history ? obj.history : [];
            histories.push(clickData.selectionText); // this is used as a stack, to retrieve items use array.pop();
            console.log(histories); // use it for debugging if needed
            chrome.storage.sync.set({history: histories}, () => {
                chrome.windows.create({type: "popup",
                    url: "https://www.amazon.com/s/ref=nb_sb_noss?url=srs%3D2231352011%26search-alias%3Dcoupons&field-keywords="
                    + clickData.selectionText, width: 1024, height: 600}, (window) => {
                    console.log(window.id);
                    console.log("window created");
                });
            });
        });
    }
});

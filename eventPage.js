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
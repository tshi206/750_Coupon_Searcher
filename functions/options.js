$().ready(() => {
    console.log("This is a dummy.");
    // why 'change' event rather than 'click' event for bootstrap radio buttons?
    // see: https://stackoverflow.com/questions/20832568/click-event-not-firing-within-a-bootstrap-radio-button-group
    $('#history_on').on("change", () => {
        notifyOptions("historyOn");
        // todo - history on handler
        // use the visible class in popup.css
        // set the [isHistoryOn] in storage.sync to true
        chrome.storage.sync.set({isHistoryOn:true},function(){});
    });
    $('#history_off').on("change", () => {
        notifyOptions("historyOff");
        // todo - history off handler
        // to disable the history feature simply set the css class of the corresponding div inside popup.html to invisible
        // set the [isHistoryOn] in storage.sync to false
        chrome.storage.sync.set({isHistoryOn:false},function(){});
    });
    $('#clear_history').on("click", () => {
        notifyOptions("clearHistory");
        // todo - clear history handler, essentially clear the chrome.storage.sync space in 'history'
        // set the ['history'] in storage.sync to empty ARRAY, i.e., obj.history = [];
        // see examples in eventPage.js to get and set objects in chrome.storage.sync space.
        // in addition, restore the texts inside the history list to default : "No recent activity"
        // and add the css class 'disabled' to each of the 'list-group-item', retrieving them via $('.list-group-item')
        // to add class to DOM element, use: some_element.classList.add('name_of_the_css_class').
        // see examples in popup_button_action.js where the classList.contain() and classList.remove() are demonstrated.
        // essentially, element.classList is just an ordinary JS ARRAY of strings, hence array operations are supported.
    });
    $('#popup_on').on("change", () => {
        notifyOptions("popupOn");
        // todo - popup on handler
        // set the ['isPopupOnSelect'] in storage.sync to true
        chrome.storage.sync.set({isPopupOnSelect: true},function(){


            if (chrome.runtime.error) {
                console.log("Runtime error.");
            }
        });
    });
    $('#popup_off').on("change", () => {
        notifyOptions("popupOff");
        // todo - popup off handler
        // set the ['isPopupOnSelect'] in storage.sync to false
chrome.storage.sync.set({isPopupOnSelect: false},function(){
    if (chrome.runtime.error) {
    console.log("Runtime error.");
}
});
    });
});

let notifyOptions = (msg) => {
    switch (msg) {
        case "historyOn" :
            msg = "History turned on!";
            break;
        case "historyOff":
            msg = "History turned off!";
            break;
        case "clearHistory":
            msg = "History has been cleared!";
            break;
        case "popupOn":
            msg = "Popup enabled!";
            break;
        case "popupOff":
            msg = "Popup disabled!";
            break;
    }
    let notifOptions = {
        type: 'image',
        iconUrl: 'resources/icon_enlarged.png',
        imageUrl: "resources/big-green-tick.jpg",
        title: 'Change applied!',
        message: msg
    };
    chrome.notifications.create('searchNotif', notifOptions)
};
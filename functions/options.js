$().ready(() => {
    console.log("This is a dummy.");
    // why 'change' event rather than 'click' event for bootstrap radio buttons?
    // see: https://stackoverflow.com/questions/20832568/click-event-not-firing-within-a-bootstrap-radio-button-group
    $('#history_on').on("change", () => {
        notifyOptions("historyOn");
        // todo - history on handler
        // use the visible class in popup.css
    });
    $('#history_off').on("change", () => {
        notifyOptions("historyOff");
        // todo - history off handler
        // to disable the history feature simply set the css class of the corresponding div inside popup.html to invisible
    });
    $('#clear_history').on("click", () => {
        notifyOptions("clearHistory");
        // todo - clear history handler, essentially clear the chrome.storage.sync space
        // set the ['history'] in storage.sync to empty string
    });
    $('#popup_on').on("change", () => {
        notifyOptions("popupOn");
        // todo - popup on handler
        // set the ['isPopupOnSelect'] in storage.sync to true
    });
    $('#popup_off').on("change", () => {
        notifyOptions("popupOff");
        // todo - popup off handler
        // set the ['isPopupOnSelect'] in storage.sync to false
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
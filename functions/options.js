$().ready(() => {
    console.log("This is a dummy.");
    // why 'change' event rather than 'click' event for bootstrap radio buttons?
    // see: https://stackoverflow.com/questions/20832568/click-event-not-firing-within-a-bootstrap-radio-button-group

    // Setting active button depending on the stored flag in the chrome.storage.sync
    // As it uses the storage space to save the variable, the setting is saved even if the chrome browser is closed.
    // Starting with history on/off buttons.
    chrome.storage.sync.get(['isHistoryOn'],function(flag){
        if(flag.isHistoryOn == null){flag.isHistoryOn=true;}
        isHistoryOn = flag.isHistoryOn ? flag.isHistoryOn : false;
        console.log(flag);
        if(isHistoryOn){
            if(!(document.getElementById('history1').classList.contains('active'))){
                document.getElementById('history2').classList.remove('active');
                document.getElementById('history1').classList.add('active');
            }
            //Change the class to be invisible so the history tab is invisible on the page.
        }else if(!isHistoryOn){
            console.log("false");
            if(!(document.getElementById('history2').classList.contains('active'))){
                document.getElementById('history1').classList.remove('active');
                document.getElementById('history2').classList.add('active');
                console.log("false view");
            }
        }
    });

    // Deciding on active setting for users convenience for popoup on select menu.
    chrome.storage.sync.get(['isPopupOnSelect'],function(flag){
        if(flag.isPopupOnSelect == null){flag.isPopupOnSelect=true;}
        isPopupOnSelect = flag.isPopupOnSelect ? flag.isPopupOnSelect : false;
        console.log(flag);
        if(isPopupOnSelect){
            if(!(document.getElementById('popupOn').classList.contains('active'))){
                document.getElementById('popupOff').classList.remove('active');
                document.getElementById('popupOn').classList.add('active');
            }
            //Change the class to be invisible so the history tab is invisible on the page.
        }else if(!isPopupOnSelect){
            console.log("false");
            if(!(document.getElementById('popupOff').classList.contains('active'))){
                document.getElementById('popupOn').classList.remove('active');
                document.getElementById('popupOff').classList.add('active');
                console.log("false view");
            }
        }
    });


    $('#history_on').on("change", () => {
        notifyOptions("historyOn");
        // set the [isHistoryOn] in storage.sync to true
        // the value read by js related to popup.html to change the style.
        chrome.storage.sync.set({isHistoryOn:true},function(){});
    });
    $('#history_off').on("change", () => {
        notifyOptions("historyOff");
        // set the [isHistoryOn] in storage.sync to false
        // as direct access to file is not possible from this javascript,
        // the value is read by the 'popup_button_action.js which decide weather history tab to be shown or not
        // when popup.html is loaded.
        chrome.storage.sync.set({isHistoryOn:false},function(){});
    });
    $('#clear_history').on("click", () => {
        // set the ['history'] in storage.sync to empty ARRAY, i.e., obj.history = [];
        // when users move from the amazon.com to the option.html, they lose focus and popup window is automatically
        // closed. Therefore, when the history is cleared in option.html, popup.html is essentially reloaded if the user
        // want to use the coupon search on amazon. By reloading the popup.html, there is no need for removing and changing
        // list content to the default as it automatically does it.
        var check = confirm("Are you sure about clearing the search history?");
        if(check == true){
            notifyOptions("clearHistory");
            chrome.storage.sync.set({history:[]},function(){
               console.log("history cleared")
            });
        }
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

/**
 * Method to create an google chrome notification depending on the change related
 * to the extension. Argument message is received from javascript event listners
 * placed on various button objects in options.html.
 */
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
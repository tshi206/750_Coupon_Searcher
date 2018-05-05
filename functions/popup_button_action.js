$().ready( () => {

    console.log("popup.html ready");
    let historyItems = $('.list-group-item');

    //check whether the view history is on or not
    chrome.storage.sync.get(['isHistoryOn'],function(flag){
        if(flag.isHistoryOn == null){flag.isHistoryOn=true;}
        isHistoryOn = flag.isHistoryOn ? flag.isHistoryOn : false;
        console.log(flag);
        //Change the class to be visible so the history tab is visible on the page.
        if(isHistoryOn){
           if(document.getElementById('historyTab').classList.contains('invisible')){
               document.getElementById('historyTab').classList.remove('invisible');
               document.getElementById('historyTab').classList.add('visible');
               console.log("view");
           }
            //Change the class to be invisible so the history tab is invisible on the page.
        }else if(!isHistoryOn){
            console.log("false");
            if(document.getElementById('historyTab').classList.contains('visible')){
                document.getElementById('historyTab').classList.remove('visible');
                document.getElementById('historyTab').classList.add('invisible');
                console.log("false view");
            }
        }
    })
    /** When the page is loaded, the script check the chrome.storage.sync for history data.
    * Depending on the length of array retrieved from the storage, the script decide whether
    * the history item to be shown on the popup.html. If there is less than 5 history object and leave
     * space for empty, the list shown on the page will be default with no hyperlink connected to it.
     */
    chrome.storage.sync.get(['history'], obj => {
        console.log(obj.history);
        console.log(historyItems);
        if (obj.history) {
            let size = obj.history.length;
            console.log("There are " + size + " items in the history");
            size = size - 1;
            historyItems.each((index, value) => {
                console.log(value);
                console.log(value.firstChild.nodeValue);
                console.log(obj.history[size - index]);
                if (obj.history[size - index]) {
                    value.classList.remove("disabled");
                    value.firstChild.nodeValue = obj.history[size - index];
                }
            })
        }
            /**
            * When search button is clicked, the function below add the search result into the storage system for history
             * function. After saving it into the storage, it creates new window showing the result of the search so users
             * can use the coupon on the selected item. Original plan was to implement other API provided
             * by third party such as Groupon API, but they required token key which is only distributed to
             * other business partners (even if they are free to use).
            */
            $("#searchBtn").on("click", () => {
            console.log("search button clicked");
            let searchText = $('#searchField').val();;
            chrome.storage.sync.get(['history'], (obj) => {
                let histories = obj.history ? obj.history : [];
                histories.push(searchText); // this is used as a stack, to retrieve items use array.pop();
                console.log(histories); // use it for debugging if needed
                chrome.storage.sync.set({history: histories}, () => {
                    chrome.windows.create({type: "popup",
                        url: "https://www.amazon.com/s/ref=nb_sb_noss?url=srs%3D2231352011%26search-alias%3Dcoupons&field-keywords="
                        + searchText, width: 1024, height: 600}, (window) => {
                        console.log(window.id);
                        console.log("window created");
                    });
                });
            });

        });
/**
 * The following function is for the action to be taken when the user clicks the recent search result.
 * When it is clicked, it opens new windows showing the result of the search according to the hyperlink saved.
 */
        historyItems.on("click", () => {
            let item = this.document.activeElement;
            console.log("history button clicked");
            console.log(item);
            if (!item.classList.contains("disabled")) {

                let searchText = $(item).text();
                console.log(searchText);
                chrome.storage.sync.get(['history'], (obj) => {
                    let histories = obj.history ? obj.history : [];
                    histories.push(searchText); // this is used as a stack, to retrieve items use array.pop();
                    console.log(histories); // use it for debugging if needed
                    chrome.storage.sync.set({history: histories}, () => {
                        chrome.windows.create({type: "popup",
                            url: "https://www.amazon.com/s/ref=nb_sb_noss?url=srs%3D2231352011%26search-alias%3Dcoupons&field-keywords="
                            + searchText, width: 1024, height: 600}, (window) => {
                            console.log(window.id);
                            console.log("window created");
                        });
                    });
                });

            }
        })
    });
} );

$().ready( () => {
    $("#searchBtn").on("click", () => {
        console.log("search button clicked");
        let searchText = $('#searchField').val();
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

    $('.list-group-item').on("click", () => {
        let item = this.document.activeElement;
        console.log("history button clicked");
        console.log(item);
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
    })
} );

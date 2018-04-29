$().ready( () => {
    $("#searchBtn").on("click", () => {
        console.log("search button clicked");
        // todo - send ajax to coupon api
        $.ajax({ url: 'https://www.amazon.com/coupons/b/?node=13285418011', success: function(data) { console.log(data); } });
        let searchText = $('#searchField').val();
        chrome.windows.create({type: "popup", url: "https://www.amazon.com/s/ref=nb_sb_noss?url=srs%3D2231352011%26search-alias%3Dcoupons&field-keywords=" + searchText, width: 1024, height: 600}, (window) => {
            console.log(window.id);
            console.log("window created");
        });
    })
} );

function clickSearchBtn() {
    console.log("I'm fired");
    // todo - fill up the search bar
    $("#searchBtn").click();
}
$().ready( () => {
    $("#searchBtn").on("click", () => {
        console.log("search button clicked");
        // todo - send ajax to coupon api
    })
} );

function clickSearchBtn() {
    console.log("I'm fired");
    // todo - fill up the search bar
    $("#searchBtn").click();
}
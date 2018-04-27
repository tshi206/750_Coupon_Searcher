$().ready(() => {
    chrome.storage.sync.get(['msg'], (obj) => {
        //alert(obj.msg);
        $('#results').text(obj.msg);
        // todo - generate a short list of results
    })
});

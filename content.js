chrome.runtime.sendMessage({todo: "showPageAction"});

$().ready(() => {

    console.log("content script ready");

    document.addEventListener("mousemove", update_mouse_pos, true);
    document.addEventListener("mouseup", on_mouse_up, true);
    document.addEventListener("mousedown", on_mouse_down, true);
    document.addEventListener("dblclick", on_mouse_dbclick, true);

    let clientX, clientY;
    let mouse_down_x, mouse_down_y;

    function onText(response) {}


    function update_mouse_pos(event) {
        clientX = event.clientX; clientY = event.clientY;
    }


    function on_mouse_down(event) {
        mouse_down_x = event.clientX;
        mouse_down_y = event.clientY;
    }


    function on_mouse_up(event) {
        if ( Math.abs(event.clientX - mouse_down_x) > 2 || Math.abs(event.clientY - mouse_down_y) > 2)
        {
            let sText = document.selection === undefined ? document.getSelection().toString():document.selection.createRange().text;
            if (sText !== "")
            {
                if (sText.length >2000)
                    sText = sText.substr(0, 2000);
                chrome.runtime.sendMessage({action:"select", msg:sText}, onText);
                console.log(sText);
            }
        }
    }

    function on_mouse_dbclick() {
        let sText = document.selection === undefined ? document.getSelection().toString():document.selection.createRange().text;
        if (sText !== "")
        {
            if (sText.length > 2000)
                sText = sText.substr(0, 2000);
            chrome.runtime.sendMessage({action:"select", msg:sText}, onText);
            console.log(sText);
        }
    }

});

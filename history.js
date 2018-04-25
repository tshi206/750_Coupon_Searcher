//Check for xml file that stores history and execute function according to command given
function getHistory(message) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(message == "add")
                addHistory(this);
            else
                clearHistory(this);
        }
    };
    xhttp.open("GET", "history.xml", true);
    xhttp.send();
}

//Function that adds search history element into the xml file provided.
function addHistory(xml) {

    var x, newElement, xmlDoc, searchData;
    xmlDoc = xml.responseXML;
    //Create search element to contain details about the search
    newElement = xmlDoc.createElement("search");

    //Child element to store the name of the search occurred
    searchData = documet.getElementById("search-data");
    var nameEle = xmlDoc.createElement("name");
    var nameText = xmlDoc.createTextNode(searchData);
    nameEle.appendChild(nameText);

    //child element to store the date of the search
    var dateData = new Date();
    var dateEle = xmlDoc.createElement("date");
    var dateText = xmlDoc.createTextNode(dateData.toString());
    dateEle.appendChild(dateText);

    //Add child elements in the search element
    newElement.appendChild(nameEle);
    newElement.appendChild(dateEle);

    //Add the search element into the history root element
    x = xmlDoc.getElementsByTagName("history")[0];
    x.appendChild(newElement);
}

function clearHistory(xml) {
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("history")[0];
    
    //removes the first child element until there is nothing left in the root element.
    while (x.firstChild) {
        x.removeChild(x.firstChild);
    }
}




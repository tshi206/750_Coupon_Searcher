function getHistory() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            addHistory(this);
        }
    };
    xhttp.open("GET", "history.xml", true);
    xhttp.send();
}

function addHistory(xml) {
    var x, newElement, xmlDoc, searchData;
    xmlDoc = xml.responseXML;
    newElement = xmlDoc.createElement("search");


    searchData = documet.getElementById("search-data");
    var nameEle = xmlDoc.createElement("name");
    var nameText = xmlDoc.createTextNode(searchData);
    nameEle.appendChild(nameText);

    var dateData = new Date();
    var dateEle = xmlDoc.createElement("date");
    var dateText = xmlDoc.createTextNode(dateData.toString());
    dateEle.appendChild(dateText);

    newElement.appendChild(nameEle);
    newElement.appendChild(dateEle);

    x = xmlDoc.getElementsByTagName("history")[0];
    x.appendChild(newElement);
}
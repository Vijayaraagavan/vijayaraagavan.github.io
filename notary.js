var xmlhttp;
function loadbook(filename, displayName){
    let currentBook = "";
    let url = "/" + filename;

//reset our UI
document.getElementById("filename").innerHTML = displayName;
document.getElementById("searchstat").innerHTML = '';
document.getElementById("keyword").value="";

//create a server request to load our book
var xhr = new XMLHttpRequest();
xhr.open("GET",url,true);
xhr.send();

xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status == 200){
        currentBook = xhr.responseText;
        currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');
        document.getElementById("filecontent").innerHTML = currentBook;

        let elem = document.getElementById("filecontent");
        elem.scrollTop=0;
        getDocStats(currentBook);
    }
}
}
function getDocStats(filecontent){

    let docLength = document.getElementById("docLength");
    let wordCount = document.getElementById("wordCount");
    let charCount = document.getElementById("charCount");

    let text = filecontent.toLowerCase();
    let wordArray = text.match(/\b\S+\b/g);
    console.log(wordArray);
    wordDictionary = {};
    for(let word in wordArray){
        let wordValue = wordArray[word];

        if(wordDictionary[wordValue]>0){
            wordDictionary[wordValue]+=1;
        }else{
            wordDictionary[wordValue] =1;
    }
}
console.log(wordDictionary);
    let wordList = sortProperties(wordDictionary);
    console.log(wordList);
    var top5Words = wordList.slice(0, 6);
    //return the least 5 words
    var least5Words = wordList.slice(-6, wordList.length);

    //Write the values to the page
    ULTemplate(top5Words, document.getElementById("mostUsed"));
    ULTemplate(least5Words, document.getElementById("leastUsed"));

    docLength.innerText = "Document Length: " + text.length;
    wordCount.innerText = "Word Count: " + wordArray.length;
}
function ULTemplate(items, element) {
    let rowTemplate = document.getElementById('template-ul-items');
    let templateHTML = rowTemplate.innerHTML;
    let resultsHTML = "";

    for (i = 0; i < items.length - 1; i++) {
        resultsHTML += templateHTML.replace('{{val}}', items[i][0] + " : " + items[i][1] + " time(s)");
    }

    element.innerHTML = resultsHTML;

}

function sortProperties(obj){
    let rtnArray = Object.entries(obj);
    rtnArray.sort(function(first,second){
        return second[1] - first[1];
    });
    return rtnArray;
}
function performMark() {

    //read the keyword
    var keyword = document.getElementById("keyword").value;
    var display = document.getElementById("filecontent");

    var newContent = "";

    //find all the currently marked items
    let spans = document.querySelectorAll('mark');

    //<mark>Harry</mark>
    //Harry

    for (var i = 0; i < spans.length; i++) {
        spans[i].outerHTML = spans[i].innerHTML;
    }

    var re = new RegExp(keyword, "gi");
    var replaceText = "<mark id='markme'>$&</mark>";
    var bookContent = display.innerHTML;

    //add the mark to the book content
    newContent = bookContent.replace(re, replaceText);

    display.innerHTML = newContent;
    var count = document.querySelectorAll('mark').length;
    document.getElementById("searchstat").innerHTML = "found " + count + " matches";

    if (count > 0) {
        var element = document.getElementById("markme");
        element.scrollIntoView();
    };
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           return;
        }
    };
    xmlhttp.open("GET", "sub.php?q=" + keyword, true);
    xmlhttp.send();

}

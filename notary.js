function loadbook(filename, displayName){
    let currentBook = "";
    let url = "/" +filename;

//reset our UI
document.getElementById("filename").innerHTML = displayName;
document.getElementById("searchstat").innerHTML = '';
document.getElementById("keyword").value="";

//create a server request to load our book
let xhr = XMLHttpRequest();
xhr.open("GET",url,true);
xhr.send();

xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status == 200){
        currentBook = xhr.responseText;
        document.getElementById("filecontent").innerHTML = currentBook;
    }
}

}
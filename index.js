function myFunction(){

    var doc1 = document.getElementsByClassName("navitem")
    console.log(doc1)

    for(var i =0; i<doc1.length; i++){

        if(doc1[i] == document.getElementById("ig")){
            console.log("found")
            continue;
        }

        if (doc1[i].style.display != "none"){

            doc1[i].style.display = "none"
        }
        else{
            doc1[i].style.display = "inline"
        }
    }
    
}


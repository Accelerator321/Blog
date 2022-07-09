fetch(document.getElementById('url').innerHTML,{
    method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: ''
}).then(res=>res.json()).then(data=>{

            var p =0;
            var h= 0;
    for(let i=0; i<data.pattern.length;i++){

        if(data.pattern[i]==='p'){
            var val =document.getElementById('myblog').innerHTML;
            
            document.getElementById('myblog').innerHTML = val+ `<p class="card-text" style="font-family: 'Edu SA Beginner', cursive;font-size: 1.4rem;font-weight: 400;">${data.text[p]}</p>`;
            p++;
        }
        else if(data.pattern[i]==='h'){
            var val =document.getElementById('myblog').innerHTML;
            document.getElementById('myblog').innerHTML = val+ `<h2 class="card-text" style="font-family: 'Edu SA Beginner', cursive;">${data.heading[h]}</h2>`;
            h++;
        }

    }
}
)

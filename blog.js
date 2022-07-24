fetch(`/blogcontent?getid=${document.getElementById('get').innerHTML.replace("/", "")}`).then(res=>res.json()).then(data=>{

            var p =0;
            var h= 0;
            var im =0;
            console.log(data.image)
    for(let i=0; i<data.pattern.length;i++){

        if(data.pattern[i].includes("p")){
            var val =document.getElementById('myblog').innerHTML;
            
            document.getElementById('myblog').innerHTML = val+ `<p class="card-text" style="font-family: 'Edu SA Beginner', cursive;font-size: 1.4rem;font-weight: 400;">${data.text[p]}</p>`;
            p++;
        }
        else if(data.pattern[i].includes('h')){
            var val =document.getElementById('myblog').innerHTML;
            document.getElementById('myblog').innerHTML = val+ `<h2 class="card-text" style="font-family: 'Edu SA Beginner', cursive;">${data.heading[h]}</h2>`;
            h++;
        }
        else if(data.pattern[i].includes('i')){
            var val =document.getElementById('myblog').innerHTML;
            document.getElementById('myblog').innerHTML = val+ `<img src="${data.image[im]}" alt="..." style="max-height:65vh; width:100%; object-fit:contain;"/>`
            im++;
        }

    }
}
)

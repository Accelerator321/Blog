var i = 10;
var page = 1;
// fetch(`/recentblogs?i=${i}`).then(res => res.json()).then(json => {

//     var data = json.reverse();

//     var index=0;

//         document.querySelector("#prev").style.display = 'none';


// showblog(data,index);
//         document.querySelector("#next button").addEventListener('click', () => {
//             page +=1
//             document.querySelector("#prev").style.display = 'initial';
//             index+=2;
//             showblog(data,index);
//             if (index+2 >= data.length) {
//                 document.querySelector("#next button").style.display = 'none'
//             }
//         })




// document.querySelector('#prev').addEventListener('click',()=>{
//     index-=2;
//     showblog(data,index);
//     if(index <data.length && document.querySelector("#next button").style.display === 'none'){
//         document.querySelector("#next button").style.display = 'initial'
//     }
//     if (index === 0) {
//         document.querySelector("#prev").style.display = 'none'
//     }
    
// }
// )}


// )

// const showblog =(data, index)=>{
//     if (index + 2 <= data.length) {
//         document.querySelector('#cardbox').innerHTML = ' ';
//         for (let i = index; i < index + 2; i++) {
//             div = document.createElement('div');
//             div.innerHTML = `<div class="card mb-3 mx-4 my-5 homecard">
//         <div class="row g-0">
//             <div class="col-md-4 d-flex justify-content-center"><img class="img-fluid rounded-start" style="object-fit:fill;" src="${data[i].image[0]}" alt="..." /></div>
//             <div class="col-md-8">
//                 <div class="card-body">
//                     <h5 class="card-title">${data[i].title}</h5>
//                     <p class="card-text">${data[i].text[0].slice(0, 150)}...<a href="/getblogs?getid=${data[i].getid}" style="color:#b38c80;">Read More</a></p>
//                         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    
//                 </div>
//             </div>
//         </div>
//     </div>`;
//             document.querySelector('#cardbox').appendChild(div);
//         }

//     }
//     else {
//         document.querySelector('#cardbox').innerHTML = ' ';
//         for (let i = index; i < data.length; i++) {
//             div = document.createElement('div');
//             div.innerHTML = `<div class="card mb-3 mx-2 my-5 homecard">
//         <div class="row g-0">
//             <div class="col-md-4 d-flex justify-content-center"><img class="img-fluid rounded-start" style="object-fit:fill;max-height: 200px;max-width: fit-content;" src="${data[i].image[0]}" alt="..." /></div>
//             <div class="col-md-8">
//                 <div class="card-body">
//                     <h5 class="card-title">${data[i].title}</h5>
//                     <p class="card-text">${data[i].text[0].slice(0, 150)}...<a href="/getblogs?getid=${data[i].getid}" style="color:#b38c80;">Read More</a></p>
//                         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    
//                 </div>
//             </div> 
//         </div>
//     </div>`;
//             document.querySelector('#cardbox').appendChild(div);
//         }
//     }

// }





var tpage;

function checkpage(){
if(page ==1){
    document.getElementById('prev').style.display ='none';
}
else{
    document.getElementById('prev').style.display ='initial';
}
if(tpage){

    if(page==tpage){
        document.getElementById('next').style.display = 'none';
    }
    else{
        document.getElementById('next').style.display = 'initial';
    }
}

}

fetch('/totalpage').then(res=>res.json()).then(pages=>{
    tpage = pages;
    console.log(pages)
})




document.getElementById('next').addEventListener('click',()=>{
    page +=1;
    showblog();
    checkpage();
   
    
    
})
document.getElementById('prev').addEventListener('click',()=>{
    page -=1;
    showblog();
    checkpage();

    
})


const showblog = async()=>{
    var data = await fetch(`/recentblogs?page=${page}`).then(res => res.json())
    document.querySelector('#cardbox').innerHTML = ' ';
        for (let i = 0; i < 2; i++) {
            div = document.createElement('div');
            div.innerHTML = `<div class="card mb-3 mx-4 my-5 homecard">
        <div class="row g-0">
            <div class="col-md-4 d-flex justify-content-center"><img class="img-fluid rounded-start" style="object-fit:fill;" src="${data[i].image[0]}" alt="..." /></div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${data[i].title}</h5>
                    <p class="card-text">${data[i].text[0].slice(0, 150)}...<a href="/getblogs?getid=${data[i].getid}" style="color:#b38c80;">Read More</a></p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    
                </div>
            </div>
        </div>
    </div>`;
            document.querySelector('#cardbox').appendChild(div);
        }
}

showblog();
checkpage();
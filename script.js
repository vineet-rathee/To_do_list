let btn=document.querySelectorAll("button");

// to show the input box for adding tasks
btn[0].addEventListener("click",function(){
        inp.classList.toggle("hide");
        let taskInput = document.querySelector('input[type="text"]');
        taskInput.focus();
    })

// to clear all task
btn[1].addEventListener("click",function(){
    let a=document.querySelector(".list");
    let b=a.querySelectorAll("div");   
    b.forEach(el => {
        el.remove();
    }); 
    localStorage.removeItem("data");
})

//to toggle theme
btn[2].addEventListener("click",function(){
    body.classList.toggle("dark");
    body.classList.toggle("light");
})

// to add a task
let inp = document.querySelector(".in");
let tex= inp.querySelector("form");
tex.addEventListener("submit",function(det){
    det.preventDefault();
    if(tex[0].value.length>0)
    {
        let a=document.createElement("div");
        a.classList.add("card");
        let b=document.createElement("input");
        b.type="checkbox";
        let c=document.createElement("span");
        c.textContent=tex[0].value;
        let parent=document.querySelector(".list");
        let d=document.createElement("p");
        d.textContent=" ";
        parent.append(a);
        a.append(b);
        a.append(c);
        a.append(d);
        inp.classList.add("hide");
        tex[0].value="";
        update();
    }
})


// to schedule to remove a task
let tasks=document.querySelector(".list");
tasks.addEventListener("click",function(det){
    let par=det.target.parentElement;
    if(det.target.checked)
    {
        par.querySelector("span").style.textDecoration = "line-through";
        par.style.backgroundColor="red";
        let t=5;
        par.tim = setInterval(function(){
            par.querySelector("p").textContent=t--;
        },1000);
        par.timer= setTimeout(function(){
            par.remove();
            update();
        },6000);
    }
    else
    {   
        par.querySelector("span").style.textDecoration = "none";
        par.style.backgroundColor = "";
        clearTimeout(par.timer);
        clearInterval(par.tim);
        par.querySelector("p").textContent=" ";
    }
})

// to toggle theme
let body=document.querySelector("body");
let task=document.querySelector(".task");
let card=document.querySelectorAll(".card");
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.classList.add("dark");
    body.classList.remove("light");
} 
else {
    body.classList.remove("dark");
    body.classList.add("light");
}


// to hide the input box when clicked out of focus
window.addEventListener("click", function(det) {
    if (!inp.contains(det.target) && !task.contains(det.target)) {
        inp.classList.add("hide");
    }
});

// to retrive data from local storage whenever the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    let data=localStorage.getItem("data");
    if(data!=null)
    {
        let arr=JSON.parse(data);
        arr.forEach(el=>
        {    
            let a=document.createElement("div");
            a.classList.add("card");
            let b=document.createElement("input");
            b.type="checkbox";
            let c=document.createElement("span");
            c.textContent=el;
            let d=document.createElement("p");
            d.textContent=" ";
            let parent=document.querySelector(".list");
            parent.append(a);
            a.append(b);
            a.append(c);
            a.append(d);
        })
    }
});

// to store data into local sotrage whenever the add task or clear task button or any individual task is removed
function update()
{
    let arr=[];
    let temp=document.querySelectorAll(".card");
    temp.forEach(det=>{
        arr.push(det.querySelector("span").textContent);
    })
    let str=JSON.stringify(arr);
    localStorage.setItem("data",str);
}


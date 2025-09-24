const repoName = "qacetask2";   
let basePath = "";

if (window.location.hostname.includes("github.io")) {
  basePath = `/${repoName}`;
} else {
  basePath = "..";
}

const users = [{img:`${basePath}/assets/images/IMG_20191220_220608.jpg`, name:`Name1`, text: `Lorem1 ipsum dolor sit amet consectetur adipisicing elit. Accusamus optio maiores aliquid officiis magni voluptates aut! Similique voluptatem a explicabo, cum soluta, dicta voluptas ipsam, ullam repellat facere ut laudantium?`, rating: 3}, {img:`${basePath}/assets/images/IMG_20191220_220620.jpg`, name:`Name2`, text: `Lorem2 ipsum dolor sit amet consectetur adipisicing elit. Accusamus optio maiores aliquid officiis magni voluptates aut! Similique voluptatem a explicabo, cum soluta, dicta voluptas ipsam, ullam repellat facere ut laudantium?`, rating: 4}, {img:`${basePath}/assets/images/IMG_20191220_220608.jpg`, name:`Name3`, text: `Lorem3 ipsum dolor sit amet consectetur adipisicing elit. Accusamus optio maiores aliquid officiis magni voluptates aut! Similique voluptatem a explicabo, cum soluta, dicta voluptas ipsam, ullam repellat facere ut laudantium?`, rating: 4}, {img:`${basePath}/assets/images/IMG_20191220_220608.jpg`, name:`Name4`, text: `Lorem4 ipsum dolor sit amet consectetur adipisicing elit. Accusamus optio maiores aliquid officiis magni voluptates aut! Similique voluptatem a explicabo, cum soluta, dicta voluptas ipsam, ullam repellat facere ut laudantium?`, rating: 5}, {img:`${basePath}/assets/images/IMG_20191220_220608.jpg`, name:`Name5`, text: `Lorem5 ipsum dolor sit amet consectetur adipisicing elit. Accusamus optio maiores aliquid officiis magni voluptates aut! Similique voluptatem a explicabo, cum soluta, dicta voluptas ipsam, ullam repellat facere ut laudantium?`, rating: 4}]
let showingcards = [0,1,2];
let midcard = showingcards[1];

const carouseldiv = document.getElementById("carouselcards");
console.log(carouseldiv);
const carouselbtns = document.querySelectorAll(".carouselbtn");
console.log(carouselbtns);


// const carddivs = document.getElementsByClassName("card");

function createcard(namee, textt, imgg, index) {
    const newdiv = document.createElement("div");
    newdiv.className = "card";
    const newimg = document.createElement("img");
    newimg.src = imgg;
    newimg.alt = namee;
    const newrating = document.createElement("div");
    newrating.classList = "rating";
    const newstar = document.createElement("div");
    const newname = document.createElement("h2");
    newname.innerText = namee;
    const newtext = document.createElement("p");
    newtext.innerText = textt;

    if (index==midcard) {
        newdiv.style.marginTop = "-20px";
        newdiv.style.marginBottom = "20px";
        newdiv.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.482)"
    } 

    if (index == showingcards[0]) {
        newdiv.style.marginLeft = "-3%";
    }

    newdiv.appendChild(newimg);
    newdiv.appendChild(newname);
    newdiv.appendChild(newrating);
    newdiv.appendChild(newtext);
    newrating.appendChild(newstar);
    carouseldiv.appendChild(newdiv);
}

users.forEach((user, index)=>{
    if (showingcards.includes(index)) {
        createcard(user.name, user.text, user.img, index)
    }
})

carouselbtns.forEach((btn)=>{
    btn.addEventListener("click", (e) => {
        const btnval = e.target.innerText;

        if (btnval === "<") {
            if (midcard > -1) {
                for (let i = 0; i < showingcards.length; i++) {
                    showingcards[i] -= 1;
                }
                console.log(showingcards);
                
            }
        } else if (btnval === ">") {
            if (midcard < users.length ) {
                for (let i = 0; i < showingcards.length; i++) {
                    showingcards[i] += 1;
                }
                console.log(showingcards);
            }
        }

        showingcards = showingcards.map(i => (i + users.length) % users.length);
        midcard = showingcards[1];
        

        carouseldiv.innerHTML = "";

        showingcards.forEach((index) =>{
            console.log(users[index], index);
            createcard(users[index].name, users[index].text, users[index].img, index)

        })
    });
})

const fnameinput = document.getElementById("fname");
const emailinput = document.getElementById("email");
const messageinput = document.getElementById("message");

const sendmsgbtn = document.getElementById("sendmsg");


sendmsgbtn.addEventListener("click", (e)=>{
    e.preventDefault();

    if (!fnameinput.value || !emailinput.value || !messageinput.value) {
        alert("fill details");
    } else {
        const storage = getstorage('contactmsg');

        // storage.forEach((i)=>{
        //     i.name
        // })

        const item = {name: fnameinput.value, email:emailinput.value, msg: messageinput.value};
        

        addtostorage('contactmsg', item);
        alert(`message sent`);
        fnameinput.value = '';
        emailinput.value = '';
        messageinput.value = '';
    } 
})

function addtostorage(storagename, item){
    const storage = getstorage(storagename);
    storage.push(item);
    console.log(`${item} has been added to storage.`);
    
    localStorage.setItem(storagename, JSON.stringify(storage));
}

function getstorage (storagename){
    const storage = localStorage.getItem(storagename) ? JSON.parse(localStorage.getItem(storagename)):[];
    return storage;
}
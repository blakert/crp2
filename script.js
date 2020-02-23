const ANIMALS = {
    CAT: 'Cat',
    DOG: 'Dog'
};
let currAnimal = ANIMALS.CAT;


const catFactsUrl = 'https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts';
const dogImgsUrl = 'https://dog.ceo/api/breeds/image/random/50';
const catImgsUrl = 'https://api.thecatapi.com/v1/images/search?size=med&limit=50';
const catImgKey = '28afa6da-8207-42c7-b898-c3c9248c3549'
let catFacts = [];
let galleryUrls = [];

document.addEventListener("DOMContentLoaded", async () => {
    catFacts = await getFacts();
    toggleAnimalListener();
    getContent();
});

const isDog = () => {
    return currAnimal === ANIMALS.DOG;
}

function toggleAnimal() {
    if (isDog()) {
        currAnimal = ANIMALS.CAT;
    }
    else {
        currAnimal = ANIMALS.DOG;
    }
    document.getElementById('curr-animal').innerHTML = currAnimal;
    getContent();
}

function toggleAnimalListener(){
    const toggler = document.getElementById('toggle-animal').addEventListener('click', () => {
        toggleAnimal();
    })
}

async function getCatImages() {
    let response = await fetch(catImgsUrl,{
        mode: 'cors',
        headers: new Headers({
            'x-api-key':'28afa6da-8207-42c7-b898-c3c9248c3549',
        })
    });
    catData = await response.json();
    return catData.map(cat => {
        return cat.url;
    });
}

async function getDogImages() {
    let response = await fetch(dogImgsUrl);
    let dogData = await response.json();
    return dogData.message;
}

async function getContent() {
    if (isDog()) {
        galleryUrls = await getDogImages();
    }
    else {
        galleryUrls = await getCatImages();
    }
    // cosntruct gallery and fact section
    constructGallery();
    addFact();
}

async function getFacts() {
    let facts = await fetch(catFactsUrl);
    return await facts.json();
}

function addFact() {
    let factDiv = document.getElementById('factoid');
    factDiv.innerText = getRandomFact();
}

function constructGallery() {
    let galleryContent = '<div class="column">';
    let gallery = document.getElementById('gallery');
    for (let i = 0; i < galleryUrls.length; i++) {
        console.log('number of photos',galleryUrls.length);
        console.log('num columns', galleryUrls.length / 4)
        if ( i > 0 && i % (Math.floor(galleryUrls.length / 4)) == 0) {
            galleryContent += '</div> <div class="column">';
        }
        galleryContent += `
            <img src= ${galleryUrls[i]} />`
    }
    galleryContent += '</div>';
    gallery.innerHTML = galleryContent;
}


function getRandomFact() {
    let fact = catFacts['all'][randomIndex()].text;
    
    if (isDog()) {
        while(fact.includes('dog')){
            fact = catFacts['all'][randomIndex()].text;
        }
        fact = fact.replace(/cat/gi, 'dog');
    }
    return fact;
}

function randomIndex() {
    return  Math.floor(Math.random() * catFacts.all.length-1);
}





























































// function SearchListen() {
//     document.getElementById('Search').addEventListener('submit', async (event) => {
//         event.preventDefault();
//         const term = document.getElementById('queryTerm').value;
//         if (term == '')
//             return;
//         const categorySelect = document.getElementById('searchCategory');
//         const category = categorySelect.options[categorySelect.selectedIndex].value;
//         console.log('select', categorySelect);
//         console.log('curr', category);
//         let crimeReport = await getCrimes(term, category);
//         console.log(crimeReport);

//     });
// }

// async function getCrimes(term, category) {
//     const url = `https://NflArrest.com/api/v1/${category}/search/?term=${term}`

//         let response = await fetch(url);
//         let itemsList = await response.json();
        
//         itemsList.map(async (item) => {
//             item.arrests = await getArrests(item, category);
//             return item;
//         });
//         return itemsList;
    
// }

// async function getArrests(item, category) {
//     let id;


//     if (category === 'team') {
//         id = item.team_code;
//     }
//     else if (category == 'player') {
//         id = item.Name;
//     }
//     const url = `https://NflArrest.com/api/v1/${category}/arrests/${id}`;
//     try {
//         let response = await fetch(url);
//         return await response.json();
//         //console.log(data);
//     }
//     catch(e) {
//         return ['could not get arrest details'];
//     }

// }


// minimum viable project: search player see results
// see top players!

let parties = [];
const spanCount = document.querySelector('.count');
const partiesList = document.querySelector('ul');
const addButton = document.querySelector('#addButton');

async function fetchAllParties() {
    try {
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309_ftb_et_web_am/events');
        const json = await response.json();
        return json.data;
    } catch (ex) {
        console.log(ex);
        return [];
    }
};

async function generateRandomParty() {
    const allParties = await fetchAllParties();

    if (allParties.length === 0) {
        return null;
    }

    const newParty = {};
    const keys = Object.keys(allParties[0]);
    keys.forEach(key => {
        const randomIdx = Math.floor(Math.random() * allParties.length);
        const randomValue = allParties[randomIdx][key];
        newParty[key] = randomValue;
    });

    return newParty;
};

function render(){
    spanCount.innerHTML = parties.length;
    const html = parties.map(function(party){
        return `
          <li>
            <h5>${party.name}</h5>
            <p>Date/Time: ${party.date}</p>
            <p>Location: ${party.location}</p>
            <p>Description: ${party.description}</p>
          </li>
        `;
    }).join(' ');

    partiesList.innerHTML = html;
};

addButton.addEventListener('click', async function() {
    const newParty = await generateRandomParty();
    console.log(newParty);
    if (newParty) {
        parties.push(newParty);
        render();
    }
});

partiesList.addEventListener('click', (ev)=>  {
    if(ev.target.tagName === 'LI'){
      const li = ev.target;
      const ul = li.parentNode;
      const children = Array.from(ul.children);
      const idx = children.indexOf(li);
      parties.splice(idx, 1);
      render();
    }
});

async function renderAllParties() {
    const allParties = await fetchAllParties();
    parties = allParties;
    render();
}

renderAllParties();
let parties = [];
const spanCount = document.querySelector('.count');
const partiesList = document.querySelector('ul');
const addButton = document.querySelector('#addButton');
const partyList = document.querySelector('.partyList');

addButton.addEventListener('click', function(){
    parties.push(generateRandom());
    render();
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

function generateRandom() {
    if (parties.length === 0) {
        return fetchParties();
    }

    const newParty = {};
    const randomPartyIdx = Math.floor(Math.random()*parties.length);
    const randomParty = parties[randomPartyIdx];

    const keys = Object.keys(randomParty);
    keys.forEach(key => {
        const randomIdx = Math.floor(Math.random()*parties.length);
        const randomValue = parties[randomIdx][key];
        newParty[key] = randomValue;
    });

    return newParty;
};

function render(){
    spanCount.innerHTML = parties.length;
    const html = parties.map(function(party){
        console.log(party);
        return `
          <li>
            <h5>${party.name}</h5>
            <p>Date/Time: ${party.date}</p>
            <p>Location: ${party.location}</p>
            <p>Description: ${party.description}</p>
          </li>
        `;
    }).join(' ')
    partiesList.innerHTML = html;
};

render();

async function fetchParties(){
    try  {
    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309_ftb_et_web_am/events');
    const json = await response.json();
    parties = json.data;
    render();
    }
    catch(ex){
        console.log(ex);
    }
};

fetchParties();
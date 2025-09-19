console.log("Script loaded");
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded");
    console.log("b1:", b1);
    console.log("b2:", b2);
    console.log("b3:", b3);
    console.log("chrome:", chromy);
});

let xp = 0;
let aura = 100;
let eddies = 50;
let monster_health;
let inventory = ["finger"];
let curr_weapon = 0;
let curr_monsters = 0;

// Verify these selectors match your HTML IDs
const b1 = document.querySelector("#b1");
const b2 = document.querySelector("#b2");
const b3 = document.querySelector("#b3");
const auraCount = document.querySelector("#aura");
const eddiesCount = document.querySelector("#eddies");
const chromy = document.querySelector('#chrome');  // Make sure this matches HTML
const texties = document.querySelector("#text");
const exp = document.querySelector("#exp");
const monsterStats = document.querySelector("#monsterStat");
const monsterHealth = document.querySelector("#monsterHealth");
const monsterName = document.querySelector("#monsterName");

const chormes = [
    {name:"finger", power:1}, {name:"toxic spit", power:6},
    {name:"technical slurs", power:14}, {name:"dildo", power:22},
    {name: "organic dih", power:49}, {name:"jawline", power:69}, {name:"white skin", power:80}
]
const places = [
    {
        name:"Arasaka tower",
        "button text":["Go to Store", "Go to bad bih", "Fight Adam"],
        "button funcs":[goStore, goBih, fights],
        text: "Why are we here? Just to suffer.."
    },
    {
        name:"Bad Bih",
        "button text":["Crack bih", "Jerk off", "Go to the tower"],
        "button funcs":[hump, jorking, goTower],
        text: "Lie down boi"
    },
    {
        name:"Store",
        "button text":["Buy 10 aura points (10 eddies)", "Upgrade Chrome (30 eddies)", "Go to the tower"],
        "button funcs":[buyAura, upgrade, goTower],
        text: "Howdy chopped shit??"
    },
    {
        name:"Arena",
        "button text":["Attac", "Protec", "RUN"],
        "button funcs":[attac, protec, goTower],
        text: "Move or get FlatLine'd. You are fighting " + monsters[curr_monsters].name
    },
    {
        name:"Defeated",
        "button text":["Replay", "Replay", "PWEASEE>w<"],
        "button funcs":[replay, replay, res],
        text: "You flatline'd choom"
    }
]
const monsters = [
    { name: "Real Nigga", power: 10, health: 7 }, { name:"Gorlock the Destroyer", power: 20, health: 15}, { name:"Mikudayo", power: 30, health: 25},
    { name:"Job application", power: 50, health: 45}, { name:"Stand proud!", power: 70, health: 60}, { name:"Adam Samsher", power: 100, health: 80}, { name:"Shadow", power: 200, health: 100}
]
//init butts
b1.onclick = goStore;
b2.onclick = goBih;
b3.onclick = fights;

function update(places) {
    b1.innerText = places["button text"][0];
    b2.innerText = places["button text"][1];
    b3.innerText = places["button text"][2];

    b1.onclick = places["button funcs"][0];
    b2.onclick = places["button funcs"][1];
    b3.onclick = places["button funcs"][2];

    texties.innerText = places.text;
}

function goTower() {
    update(places[0]);
}

function goStore() {
    update(places[2]);
}

function goBih() {
    update(places[1]);
}

function fights() {
    // Update monster stats display
    monsterStats.style.display = "block";
    monsterHealth.innerText = "Health: " + monsters[curr_monsters].health;
    monsterName.innerText = "Monster: " + monsters[curr_monsters].name;
    update(places[3]);
}

function buyAura() {
    if (eddies >= 10) {
        aura += 10; 
        eddies -= 10;
        updateStats(); // Add updateStats call
    } else {
        texties.innerText = "Get a job";
    }
}

function upgrade() {
    if (curr_weapon < chormes.length - 1) {
        if (eddies >= 30) {
            eddies -= 30;
            curr_weapon++;
            inventory.push(chormes[curr_weapon].name);
            texties.innerText = "You now have " + inventory;
            updateStats(); // Add updateStats call
        } else {
            texties.innerText = "Get a job";
        }
    } else {
        texties.innerText = "Maxed out";
        b2.innerText = "Sell Chrome";
        b2.onclick = sellChrome;
    }
}

function sellChrome() {
    texties.innerText = "You sold " + chormes[curr_weapon--].name + " for 15 eddies.";
    eddies += 15;
    updateStats(); // Add updateStats call
}

function hump() {
    texties.innerText = "Dry humping";
}

function jorking() {
    texties.innerText = "Dry jorking";
}

function attac() {
    if (Math.random() < 0.2) {
        texties.innerText = "You missed!";
        return;
    }
    
    let damage = chormes[curr_weapon].power * (Math.random() * (xp + 1));
    monsters[curr_monsters].health -= damage;
    aura -= monsters[curr_monsters].power;
    
    monsterHealth.innerText = "Health: " + monsters[curr_monsters].health.toFixed(1);
    let weaponName = chormes[curr_weapon].name;
    texties.innerText = `You dealt ${damage.toFixed(1)} damage with ${weaponName}. ${monsters[curr_monsters].name} hit back!`;
    updateStats();

    if (aura <= 0) {
        defeated();
        return;
    }

    if (monsters[curr_monsters].health <= 0) {
        defeatMonster();
    }
}

function defeated() {
    update(places[4])
}

function defeatMonster() {
    if (curr_monsters >= monsters.length - 1) {
        texties.innerText = "You've defeated all monsters! Game Complete!";
        return;
    }
    let oldMonster = monsters[curr_monsters++].name;
    texties.innerText = `You defeated ${oldMonster}. Time to face off ${monsters[curr_monsters].name}!`;
    xp += Math.floor(Math.random() * monsters[curr_monsters].health * 10);
    updateStats();
    fights();
}

function protec() {
    if (Math.random() > 0.1) {
        texties.innerText = "Aura Farmer!!🔥"
        aura += Math.random() * 20;
    } else {
        texties.innerText = "Generational aura debt🙏"
        aura += Math.random() * 10;
    }
    updateStats(); // Add updateStats call
}

function replay() {
    xp = 0; 
    aura = 100; 
    eddies = 50;
    inventory = ["finger"];
    curr_monsters = 0; 
    curr_weapon = 0;
    
    // Reset all monster health
    monsters.forEach((monster, index) => {
        monsters[index] = {...monster};  // Create new object to reset health
    });
    
    update(places[0]);
    updateStats();
    monsterStats.style.display = "none";
}

function res() {
    if (Math.random() > 0.5) {
        texties.innerText = "Hold on!! Let him cook!!";
        aura = 50; 
        updateStats(); // Add updateStats call
        fights();
    } else {
        texties.innerText = "There are no second chances in the night city choom."
    }
}

function updateStats() {
    auraCount.innerText = aura;
    eddiesCount.innerText = eddies;
    exp.innerText = xp;
    chromy.innerText = chormes[curr_weapon].name;
}
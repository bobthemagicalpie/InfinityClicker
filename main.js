/*TODO: implement prestige
        add bulk buy



*/

let player = {
    number: new Decimal(0),
    tierOne: new Decimal(1),
    numPerClick: new Decimal(1),
    tierTwo: new Decimal(1),
    tierThree: new Decimal(1),
    tierFour: new Decimal(1),
    tierFive: new Decimal(1),
    tierSix: new Decimal(1),
    bulkBuy: new Decimal(1),
    bulkBuyCost: new Decimal(0),
    autoBots: new Decimal(0),
    unusedAutos: new Decimal(0),
    tierMult: new Decimal(1),
    tierMultCost: new Decimal(1e10),
    skills: [],
    tierTwoUnlocked: false,
    tierThreeUnlocked: false,
    tierFourUnlocked: false,
    tierFiveUnlocked: false,
    version: 0.1
}

let playerSave = null;

let tierOneCost = new Decimal(10)
let tierTwoCost = new Decimal(1000)
let tierThreeCost = new Decimal(1e5)
let tierFourCost = new Decimal(1e8)
let tierFiveCost = new Decimal(1e10)

let saveCheck = localStorage.getItem("PlayerSave")

function isJson(item) {
    try {
        JSON.parse(item)
    } catch(e) {
        return false;
    }
    return true;
}

let playerSaveB64 = localStorage.getItem("PlayerSave")

if (saveCheck != null && isJson(saveCheck)) {
    playerSaveB64 = btoa(saveCheck)
    saveGame()
}

if(playerSaveB64 != null) {
    let playerSaveJSON = atob(playerSaveB64)
    playerSave = JSON.parse(playerSaveJSON)
}


function loadGame() {
    if(playerSave !== null && playerSave.numPerClick !== undefined) {
        player.number = new Decimal(playerSave.number)
        player.tierOne = new Decimal(playerSave.tierOne)
        player.numPerClick = new Decimal(playerSave.numPerClick)
        player.tierTwo = new Decimal(playerSave.tierTwo)
        player.tierThree = new Decimal(playerSave.tierThree)
        player.tierFour = new Decimal(playerSave.tierFour)
        player.tierFive = new Decimal(playerSave.tierFive)
        player.tierSix = new Decimal(playerSave.tierSix)
        player.bulkBuy = new Decimal(playerSave.bulkBuy)
        player.bulkBuyCost = new Decimal(playerSave.bulkBuyCost)
        player.autoBots = new Decimal(playerSave.autoBots)
        player.unusedAutos = new Decimal(playerSave.unusedAutos)
        player.tierMult = new Decimal(playerSave.tierMult)
        player.tierMultCost = new Decimal(playerSave.tierMultCost)
        player.skills = playerSave.skills
        player.tierTwoUnlocked = playerSave.tierTwoUnlocked
        player.tierThreeUnlocked = playerSave.tierThreeUnlocked
        player.tierFourUnlocked = playerSave.tierFourUnlocked
        player.tierFiveUnlocked = playerSave.tierFiveUnlocked
    } else if(playerSave !== null && playerSave.numPerClick === undefined) {
        alert("No save detected, using previous save...")
    }
}

loadGame()

function exportSave() {
    saveGame()
    let exported_save = localStorage.getItem("PlayerSave")
    const blob = new Blob([exported_save], 
                        {type: "text/plain;charset=utf-8"})
    saveAs(blob, "save.txt")
    
}

function importSave() {
    let imported_save = prompt('Paste your save here:')
    playerSave = JSON.parse(atob(imported_save))
    loadGame()
    tab('StageOne', 'NumberBtn')
    saveGame()
}

function saveGame() {
    localStorage.setItem("PlayerSave", btoa(JSON.stringify(player)))
/*    playerSave = JSON.parse(atob(localStorage.getItem("PlayerSave")))*/
}

function resetGame() {
    let resetConfirm = confirm("Are you sure you would like to reset?")
    if(resetConfirm){
        localStorage.removeItem("PlayerSave")
        location.reload()
    }
    
}

/*window.setInterval(saveGame, 3000)*/

//if(skillTwo == true) {
//    amountCanBuy = player.number.div(1e10)
//    player.number.minus(1e10.times(amountCanBuy))
//    player.tierFive = player.tierFive.plus(player.tierSix.times(amountCanBuy))
//}

let fiveCanBuy = 1
let fourCanBuy = 1
let threeCanBuy = 1
let twoCanBuy = 1
let oneCanBuy = 1


let skillOneBought = false
let skillTwoBought = false

document.addEventListener('keydown', function(event){
    if(event.key == 1) {
        buyMult()
    } else if(event.key == 2) {
        buyMultTwo()
    } else if(event.key == 3) {
        buyTierThree()
    } else if(event.key == 4) {
        buyTierFour()
    } else if(event.key == 5) {
        buyTierFive()
    }
})

function tab(id, btnId) {
    id = document.getElementById(id)
    btnId = document.getElementById(btnId)
    document.getElementById('StageOne').style.display = 'none'
    document.getElementById('SkillTree').style.display = 'none'
    document.getElementById('Options').style.display = 'none'
    id.style.display = 'block'
    document.getElementById('Header').innerHTML = btnId.innerHTML
}

function checkSkills(skill) {
    if(skill == 'SkillOne') {
        skillOneBought = true
    } 
    
    if(skill == 'SkillTwo') {
        skillTwoBought = true
    }
}

function showButton(id) {
    id = document.getElementById(id)
    id.style.display = 'inline-block'
}

function hideButton(id) {
    id = document.getElementById(id)
    id.style.display = 'none'
}

function showText(id) {
    id = document.getElementById(id)
    id.style.display = 'block'
}

function hideCost(id) {
    id = document.getElementById(id)
    id.style.display = 'none'
}

function increaseNum() {
    player.number = player.number.plus(player.numPerClick.times(player.tierOne))
}

function buyMult() {
    if(player.number.gte(tierOneCost.times(oneCanBuy))) {
        player.tierOne = player.tierOne.plus((player.tierTwo.times(player.tierMult)).times(oneCanBuy))
        player.number = player.number.minus(tierOneCost.times(oneCanBuy))
    }
}

function buyMultTwo() {
    if(skillOneBought == false) {
        if(player.number.gte(tierTwoCost.times(twoCanBuy))) {
            player.tierTwo = player.tierTwo.plus((player.tierThree.times(player.tierMult)).times(twoCanBuy))
            player.tierOne = new Decimal(1)
            player.number = player.number.minus(tierTwoCost.times(twoCanBuy))
        }
    } else if(skillOneBought == true && player.number.gte(tierTwoCost.times(twoCanBuy))) {
        player.tierTwo = player.tierTwo.plus((player.tierThree.times(player.tierMult)).times(twoCanBuy))
        player.number = player.number.minus(tierTwoCost.times(twoCanBuy))
    }
}

function buyTierThree() {
    if(skillOneBought == false) {
        if(player.number.gte(tierThreeCost)) {
            player.tierThree = player.tierThree.plus((player.tierFour.times(player.tierMult)).times(threeCanBuy))
            player.number = player.number.minus(tierThreeCost.times(threeCanBuy))
            player.tierTwo = new Decimal(1)
            player.tierOne = new Decimal(1)
        }
    } else if(skillOneBought == true && player.number.gte(tierThreeCost.times(threeCanBuy))) {
        player.tierThree = player.tierThree.plus((player.tierFour.times(player.tierMult)).times(threeCanBuy))
        player.number = player.number.minus(tierThreeCost.times(threeCanBuy))
    }
}

function buyTierFour() {
    if(skillOneBought == false) {
        if(player.number.gte(tierFourCost.times(fourCanBuy))) {
            player.tierFour = player.tierFour.plus((player.tierFive.times(player.tierMult)).times(fourCanBuy))
            player.tierThree = new Decimal(1)
            player.tierTwo = new Decimal(1)
            player.tierOne = new Decimal(1)
            player.number = player.number.minus(tierFourCost.times(fourCanBuy))
        }
    } else if(skillOneBought == true && player.number.gte(tierFourCost.times(fourCanBuy))) {
        player.tierFour = player.tierFour.plus((player.tierFive.times(player.tierMult)).times(fourCanBuy))
        player.number = player.number.minus(tierFourCost.times(fourCanBuy))
    }
}

function buyTierFive() {
    if(skillOneBought == false) {
        if(player.number.gte(tierFiveCost.times(fiveCanBuy))){
            player.tierFive = player.tierFive.plus((player.tierSix.times(player.tierMult)).times(fiveCanBuy))
            player.tierFour = new Decimal(1)
            player.tierThree = new Decimal(1)
            player.tierTwo = new Decimal(1)
            player.tierOne = new Decimal(1)
            player.number = player.number.minus(tierFiveCost.times(fiveCanBuy))
        }
    } else if(skillOneBought == true && player.number.gte(tierFiveCost.times(fiveCanBuy))) {
        player.tierFive = player.tierFive.plus((player.tierSix.times(player.tierMult)).times(fiveCanBuy))
        player.number = player.number.minus(tierFiveCost.times(fiveCanBuy))
    }
}

function buyTierMult() {
    if(player.number.gte(player.tierMultCost)) {
        player.tierMult = player.tierMult.times(10)
        player.number = player.number.minus(player.tierMultCost)
        player.tierMultCost = player.tierMultCost.pow(1.25)
    }
}

function buySkillOne() {
    if(player.number.gte(1e15) && skillOneBought == false) {
        player.skills.push("SkillOne")
        document.getElementById('SkillOneCost').innerHTML = 'Bought!'
        document.getElementById('SkillOneBtn').disabled = true
        player.number = player.number.minus(1e15)
    }
}

function buySkillTwo() {
    if(player.number.gte("1e50") && skillTwoBought == false) {
        player.skills.push("SkillTwo")
        player.number = player.number.minus("1e50")
    }
}

//if(skillTwo == true) {
//    amountCanBuy = player.number.div(1e10)
//    player.number.minus(1e10.times(amountCanBuy))
//    player.tierFive = player.tierFive.plus(player.tierSix.times(amountCanBuy))
//}


//This function is absolutely fucking disgusting and i plan to fix it
function update() {
    if(skillTwoBought) {
        fiveCanBuy = player.number.div(1e10).floor()
        fourCanBuy = player.number.div(1e8).floor()
        threeCanBuy = player.number.div(1e5).floor()
        twoCanBuy = player.number.div(1000).floor()
        oneCanBuy = player.number.div(10).floor()
    }
    
    if(player.tierOne.gte(10) || player.tierTwoUnlocked) {
        showButton('MultTwo')
        player.tierTwoUnlocked = true
    }
    if(player.tierTwo.gte(10) || player.tierThreeUnlocked) {
        showButton('MultThree')
        player.tierThreeUnlocked = true
    }
    if(player.tierThree.gte(10) || player.tierFourUnlocked) {
        showButton('MultFour')
        player.tierFourUnlocked = true
    }
    if(player.tierFour.gte(10) || player.tierFiveUnlocked) {
        showButton('MultFive')
        player.tierFiveUnlocked = true
    }
    if(player.number.gte(1e6)) {
        document.getElementById('PlayerMoney').innerHTML = 'Your number is ' + (player.number.mantissa).toFixed(2) + 'e' + player.number.exponent
    } else {
        document.getElementById('PlayerMoney').innerHTML = 'Your number is ' + player.number.toFixed(2)
    }
    if(player.tierOne.greaterThan(1e6)) {
        document.getElementById('MoneyPerClick').innerHTML = 'You are gaining ' + (player.tierOne.mantissa).toFixed(2) + 'e' + player.tierOne.exponent
    } else {
        document.getElementById('MoneyPerClick').innerHTML = 'You are gaining ' + player.tierOne.toFixed(2) + ' per click'
    }
    if(player.tierTwo.greaterThan(1e6)) {
        document.getElementById('MultUpgrade').innerHTML = 'Tier One x' + (player.tierTwo.mantissa).toFixed(2) + 'e' + player.tierTwo.exponent
    } else {
        document.getElementById('MultUpgrade').innerHTML = 'Tier One x' + player.tierTwo.toFixed(2)
    }
    if(player.tierThree.greaterThan(1e6)) {
        document.getElementById('TierTwo').innerHTML = 'Tier Two x' + (player.tierThree.mantissa).toFixed(2) + 'e' + player.tierThree.exponent
    } else {
        document.getElementById('TierTwo').innerHTML = 'Tier Two x' + player.tierThree.toFixed(2)
    }
    if(player.tierFour.greaterThan(1e6)) {
        document.getElementById('TierThree').innerHTML = 'Tier Three x' + player.tierFour.mantissa.toFixed(2) + 'e' + player.tierFour.exponent
    } else {
        document.getElementById('TierThree').innerHTML = 'Tier Three x' + player.tierFour.toFixed(2)
    }
    if(player.tierFive.greaterThan(1e6)) {
        document.getElementById('TierFour').innerHTML = 'Tier Four x' + player.tierFive.mantissa.toFixed(2) + 'e' + player.tierFive.exponent
    } else {
        document.getElementById('TierFour').innerHTML = 'Tier Four x' + player.tierFive.toFixed(2)
    }
    if(player.tierMult.greaterThan(1e6)) {
        document.getElementById('TierMultiplier').innerHTML = 'Currently: ' + player.tierMult.mantissa + 'e' + player.tierMult.exponent 
    } else {
        document.getElementById('TierMultiplier').innerHTML = 'Currently: ' + player.tierMult
    }
    if(player.number.gte(1e10) && player.tierFive.greaterThan(1)) {
        document.getElementById('SkillBtn').style.display = 'inline-block'
    }
    if(player.skills.length > 0) {
        player.skills.some(checkSkills)
    }
    if(skillOneBought) {
        document.getElementById('SkillOneCost').innerHTML = 'Bought!'
        document.getElementById('SkillOneBtn').disabled = true
    }
    document.getElementById('AutoBots').innerHTML = 'You have ' + player.unusedAutos + ' unused autobots'
    document.getElementById('TierMultCost').innerHTML = 'Cost: ' + player.tierMultCost.mantissa.toFixed(2) + 'e' + player.tierMultCost.exponent
    
    updateBar()
}

function updateBar() {
    let progBar = document.getElementById("ProgBar")
    let progText = document.getElementById("ProgText")
    let tooltipText = document.getElementById("TooltipText")
    let width = 0;
    if(!player.tierTwoUnlocked) {
        width = player.tierOne.times(10)
        tooltipText.innerHTML = "Tier two unlock"
    }
    
    if(player.tierTwoUnlocked && !player.tierThreeUnlocked) {
        width = player.tierTwo.times(10)
        tooltipText.innerHTML = "Tier three unlock"
        
        
    }
    
    if(player.tierThreeUnlocked && !player.tierFourUnlocked) {
        width = player.tierThree.times(10)
        tooltipText.innerHTML = "Tier four unlock"
    }
    if(player.tierFourUnlocked && !player.tierFiveUnlocked) {
        width = player.tierFour.times(10)
        tooltipText.innerHTML = "Tier five unlock"
    }
    if(player.tierFiveUnlocked) {
        if(player.tierFive.gte(10)) {
            width = 100
        } else {
            width = player.tierFive.times(10) 
        }
        
        tooltipText.innerHTML = "Skills and autobots unlock"
        
    }
    
    barWidth = width.toString() + '%'
    progText.innerHTML = barWidth
    progBar.style.width = barWidth
    

}

window.setInterval(update, 50)




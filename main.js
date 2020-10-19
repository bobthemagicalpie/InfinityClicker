/*TODO: implement prestige
        add bulk buy
        add saving



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

let playerSave = JSON.parse(localStorage.getItem("PlayerSave"))

if(playerSave !== null) {
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
}

function saveGame() {
    localStorage.setItem("PlayerSave", JSON.stringify(player))
}

window.setInterval(saveGame, 3000)

skillOneBought = false

document.addEventListener('keydown', function(event){
    console.log(event.key)
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
    id.style.display = 'block'
    document.getElementById('Header').innerHTML = btnId.innerHTML
}

function checkSkills(skill) {
    if(skill == 'SkillOne') {
        skillOneBought = true
    } else {
        skillOneBought = false
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
    if(player.number.gte(10)) {
        player.tierOne = player.tierOne.plus(player.tierTwo.times(player.tierMult))
        player.number = player.number.minus(10)
    }
}

function buyMultTwo() {
    if(skillOneBought == false) {
        if(player.number.gte(1000)) {
            player.tierTwo = player.tierTwo.plus(player.tierThree.times(player.tierMult))
            player.tierOne = new Decimal(1)
            player.number = player.number.minus(1000)
        }
    } else if(skillOneBought == true) {
        player.tierTwo = player.tierTwo.plus(player.tierThree.times(player.tierMult))
        player.number = player.number.minus(1000)
    }
}

function buyTierThree() {
    if(skillOneBought == false) {
        if(player.number.gte(1e5)) {
            player.tierThree = player.tierThree.plus(player.tierFour.times(player.tierMult))
            player.number = player.number.minus(1e5)
            player.tierTwo = new Decimal(1)
            player.tierOne = new Decimal(1)
        }
    } else if(skillOneBought == true) {
        player.tierThree = player.tierThree.plus(player.tierFour.times(player.tierMult))
        player.number = player.number.minus(1e5)
    }
}

function buyTierFour() {
    if(skillOneBought == false) {
        if(player.number.gte(1e8)) {
            player.tierFour = player.tierFour.plus(player.tierFive.times(player.tierMult))
            player.tierThree = new Decimal(1)
            player.tierTwo = new Decimal(1)
            player.tierOne = new Decimal(1)
            player.number = player.number.minus(1e8)
        }
    } else if(skillOneBought == true) {
        player.tierFour = player.tierFour.plus(player.tierFive.times(player.tierMult))
        player.number = player.number.minus(1e8)
    }
}

function buyTierFive() {
    if(skillOneBought == false) {
        if(player.number.gte(1e10)){
            player.tierFive = player.tierFive.plus(player.tierSix.times(player.tierMult))
            player.tierFour = new Decimal(1)
            player.tierThree = new Decimal(1)
            player.tierTwo = new Decimal(1)
            player.tierOne = new Decimal(1)
            player.number = player.number.minus(1e10)
        }
    } else if(skillOneBought == true) {
        player.tierFive = player.tierFive.plus(player.tierSix.times(player.tierMult))
        player.number = player.number.minus(1e10)
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
    }
    console.log('working')
}

//if(skillTwo == true) {
//    amountCanBuy = player.number.div(1e10)
//    player.number.minus(1e10.times(amountCanBuy))
//    player.tierFive = player.tierFive.plus(player.tierSix.times(amountCanBuy))
//}

function update() {
    if(player.tierOne.greaterThan(10) || player.tierTwoUnlocked) {
        showButton('MultTwo')
        player.tierTwoUnlocked = true
    }
    if(player.tierTwo.greaterThan(10) || player.tierThreeUnlocked) {
        showButton('MultThree')
        player.tierThreeUnlocked = true
    }
    if(player.tierThree.greaterThan(10) || player.tierFourUnlocked) {
        showButton('MultFour')
        player.tierFourUnlocked = true
    }
    if(player.tierFour.greaterThan(10) || player.tierFiveUnlocked) {
        showButton('MultFive')
        player.tierFiveUnlocked = true
    }
    if(player.number.greaterThan(1e6)) {
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
    
}

window.setInterval(update, 50)




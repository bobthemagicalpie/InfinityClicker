let autoUnlocked = false
let autoMoney = document.getElementById('AutoMoney')
let autoOne = document.getElementById('AutoOne')
let autoTwo = document.getElementById('AutoTwo')
let autoThree = document.getElementById('AutoThree')
let autoFour = document.getElementById('AutoFour')
let autoFive = document.getElementById('AutoFive')
let autoBuyers = [autoMoney, autoOne, autoTwo, autoThree, autoFour, autoFive]
let enabledAutoBuyers = new Decimal(0)

function disable(autoBuyer) {
    autoBuyer.disabled = true
}

function enable(autoBuyer) {
    autoBuyer.disabled = false
}



function unlockAuto() {
    if(autoUnlocked == false && player.number.gte(1e10) && player.tierFive.greaterThan(1)) {
        autoMoney.style.display = 'inline-block'
        autoOne.style.display = 'inline-block'
        autoTwo.style.display = 'inline-block'
        autoThree.style.display = 'inline-block'
        autoFour.style.display = 'inline-block'
        autoFive.style.display = 'inline-block'
        document.getElementById('AutoBots').style.display = 'block'
        player.autoBots = new Decimal(1)
        autoUnlocked = true
    }
}

function checkAutoBot() {
    enabledAutoBuyers = new Decimal(0)
    for(let i = 0; i < autoBuyers.length; i++) {
        if(autoBuyers[i].checked) {
            enabledAutoBuyers = enabledAutoBuyers.plus(1)
        }
    }
    
    player.unusedAutos = player.autoBots.minus(enabledAutoBuyers)
}

function autoBuy() {
    if(player.unusedAutos < 1) {
        for(let i = 0; i < autoBuyers.length; i++) {
            if(autoBuyers[i].checked == false) {
                disable(autoBuyers[i])
            }
        }
    } else {
        for(let i = 0; i < autoBuyers.length; i++) {
            enable(autoBuyers[i])
        }
    }
    
    
    if(autoMoney.checked) {
        increaseNum()
    }
    if(autoFive.checked) {
        buyTierFive()
    }
    if(autoFour.checked) {
        buyTierFour()
    }
    if(autoThree.checked) {
        buyTierThree()
    }
    if(autoTwo.checked) {
        buyMultTwo()
    }
    if(autoOne.checked) {
        buyMult()
    }

    
    checkAutoBot()
    unlockAuto()
}

window.setInterval(autoBuy, 50)
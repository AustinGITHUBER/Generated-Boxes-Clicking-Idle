'use strict'
document.title = 'Generated Boxes Clicking Idle'
Element.createElementAppendTo = function(tagName = 'div', parent, _function = function(element) {}) {
    let elem = document.createElement(tagName)
    _function(elem)
    parent?.append?.(elem)
    return elem
}
let currency = 0n
let mainContainerDiv = Element.createElementAppendTo('div', document.body)
let displayDiv = Element.createElementAppendTo('div', mainContainerDiv, function(elem) {
    let keepDisplaying = () => {
        if (elem.textContent === currency.toString()) return requestAnimationFrame(keepDisplaying)
        elem.textContent = currency.toString()
        requestAnimationFrame(keepDisplaying)
    }
    requestAnimationFrame(keepDisplaying)
})
let canvasDivLoaded = false
let canvasDiv = Element.createElementAppendTo('div', mainContainerDiv, function(elem) {
    elem.style.border = '10px black solid'
    elem.style.width = '99px'
    elem.style.height = '99px'
    canvasDivLoaded = true
})
let shopContainerDiv = Element.createElementAppendTo()
Element.createElementAppendTo('button', mainContainerDiv, function(elem) {
    elem.style.cursor = 'pointer'
    elem.textContent = 'Go to buy place'
    elem.onclick = () => {
        canvasDivLoaded = false
        mainContainerDiv.remove()
        document.body.append(shopContainerDiv)
    }
})
let addBox = () => {
    Element.createElementAppendTo('div', mainContainerDiv, function(elem) {
        elem.style.position = 'absolute'
        elem.style.width = `${parseFloat(canvasDiv.style.width) / 9}px`
        elem.style.height = `${parseFloat(canvasDiv.style.height) / 9}px`
        elem.style.left = canvasDiv.getBoundingClientRect().left + parseFloat(canvasDiv.style.borderWidth) + Math.floor(Math.random() * 9) * 11 + 'px'
        elem.style.backgroundColor = '#2d8ee3'
        elem.style.cursor = 'pointer'
        elem.classList.add('box')
        elem.onclick = () => {
            elem.remove()
            addBox()
            currency++
        }
        let waitForTopThenDoTop = () => {
            if (!canvasDivLoaded) return requestAnimationFrame(waitForTopThenDoTop)
            elem.style.top = canvasDiv.getBoundingClientRect().top + parseFloat(canvasDiv.style.borderWidth) + Math.floor(Math.random() * 9) * 11 + 'px'
        }
        requestAnimationFrame(waitForTopThenDoTop)
    })
}
function* idGenerator() {
    let i = 0n
    while(true) {
        yield i
        i++
    }
}
let autoClickSeries = idGenerator()
let latestAutoClickIndex = idGenerator().next().value
let autoClick = async(speedMs) => {
    let index = autoClickSeries.next().value
    latestAutoClickIndex = index
    while (true) {
        await new Promise(resolve => setTimeout(resolve, speedMs))
        if (latestAutoClickIndex !== index) return
        let _function = document.querySelector('.box')?.onclick
        if (!_function) currency++
        _function?.()
    }
}
addBox()
Element.createElementAppendTo('div', shopContainerDiv, function(elem) {
    let keepDisplaying = () => {
        if (currency.toString() === elem.textContent) return requestAnimationFrame(keepDisplaying)
        elem.textContent = currency.toString()
        return requestAnimationFrame(keepDisplaying)
    }
    requestAnimationFrame(keepDisplaying)
})
let newBoxCost = 10n
Element.createElementAppendTo('button', shopContainerDiv, function(elem) {
    elem.textContent = `Buy new box for ${newBoxCost}`
    elem.style.display = 'block'
    elem.onclick = () => {
        if (newBoxCost > currency) return
        currency -= newBoxCost
        newBoxCost += 10n
        elem.textContent = `Buy new box for ${newBoxCost}`
        addBox()
    }
    elem.style.cursor = 'pointer'
})
let newAutoclickSpeedCost = 10n
let speedMs = 1000
Element.createElementAppendTo('button', shopContainerDiv, function(elem) {
    elem.textContent = `Make autoclicker faster for ${newAutoclickSpeedCost}`
    elem.style.display = 'block'
    elem.onclick = () => {
        if (newAutoclickSpeedCost > currency) return
        currency -= newAutoclickSpeedCost
        newAutoclickSpeedCost *= 2n
        elem.textContent = `Make autoclicker faster for ${newAutoclickSpeedCost}`
        autoClick(speedMs)
        speedMs -= speedMs / 50
    }
    elem.style.cursor = 'pointer'
})
Element.createElementAppendTo('button', shopContainerDiv, function(elem) {
    elem.textContent = 'Back'
    elem.style.display = 'block'
    elem.onclick = () => {
        shopContainerDiv.remove()
        document.body.append(mainContainerDiv)
        canvasDivLoaded = true
    }
    elem.style.cursor = 'pointer'
})
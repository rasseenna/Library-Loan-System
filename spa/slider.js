/*slider.js*/

console.log('SLIDER LOADED')

const slider = document.querySelector('input[name=sliderValue]')
console.log(slider)
//console.log(slider.value)
slider.addEventListener('input', event =>{
    console.log('CHANGE')
    const output = document.querySelector('[name=slider]')
    console.log(output)
    output.value = slider.value
})
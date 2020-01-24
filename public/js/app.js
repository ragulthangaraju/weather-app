
console.log('this is client side js file!')


const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const loader    = document.querySelector('#loader')
const message   = document.querySelector('#message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const search = searchInput.value
    
    loader.textContent = 'Loading...'
    message.textContent = ''

    fetch('/weather?address=' + search).then((response) => {
        response.json().then((data) => {
            if(data.error){
                loader.textContent = data.error
            }else{
                loader.textContent = data.location
                message.textContent = data.forecastData
            }
        })
    })

})



class constants {
    static API_URL =  'http://data.fixer.io/api'
    static API_TOKEN = 'eb5513d730395c719411975961c76d69'
    static API_ENDPOINT_LATEST = '/latest'
}

function checkFields(input, fromCurrency, toCurrency) {
    let error = true;
    if(input === '') {
        alert('You must set an input value')
    }
    else if (fromCurrency === "From") {
        alert('You must set the source currency')
    }
    else if (toCurrency === "To") {
        alert('You must set the target currency')
    }
    else {
        error = false
    }
    return error;
}

function callbackAPI(currencyApiRequest, input, toCurrency) {
    let response = JSON.parse(currencyApiRequest.response)
    if(!response.success) {
        alert('Code : ' + response.error.code + ' - Message : ' + response.error.type)
        document.getElementById('result-value').innerHTML = 'Error'
    }
    else {
        let taux = response.rates[toCurrency]
        let output = (parseFloat(input) * taux).toFixed(2)
        
        document.getElementById('result-value').innerText = output
        document.getElementById('result-currency').innerText = toCurrency
    }
}

function saveControls(fromCurrency, toCurrency) {
    sessionStorage.setItem('fromCurrency', fromCurrency)
    sessionStorage.setItem('toCurrency', toCurrency)
}

function restoreControls() {
    let fromCurrency = sessionStorage.getItem('fromCurrency')
    if(fromCurrency) {
        document.getElementById('from').value = fromCurrency
    }

    let toCurrency = sessionStorage.getItem('toCurrency')
    if(toCurrency) {
        document.getElementById('to').value = toCurrency
    }
}

export default { checkFields, callbackAPI, saveControls, restoreControls, constants }
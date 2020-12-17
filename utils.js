const API_URL = 'http://data.fixer.io/api'
const API_TOKEN = 'eb5513d730395c719411975961c76d69'
const API_ENDPOINT_LATEST = '/latest'

function checkFields (input, fromCurrency, toCurrency) {
  let error = true
  if (input === '') {
    alert('You must set an input value')
  } else if (fromCurrency === 'From') {
    alert('You must set the source currency')
  } else if (toCurrency === 'To') {
    alert('You must set the target currency')
  } else {
    error = false
  }
  return error
}

function callbackAPI (currencyApiRequest, input, toCurrency) {
  const response = JSON.parse(currencyApiRequest.response)
  if (!response.success) {
    alert('Code : ' + response.error.code + ' - Message : ' + response.error.type)
    document.getElementById('result-value').innerHTML = 'Error'
  } else {
    const taux = response.rates[toCurrency]
    const output = (parseFloat(input) * taux).toFixed(2)

    document.getElementById('result-value').innerText = output
    document.getElementById('result-currency').innerText = toCurrency
  }
}

function saveControls (fromCurrency, toCurrency) {
  sessionStorage.setItem('fromCurrency', fromCurrency)
  sessionStorage.setItem('toCurrency', toCurrency)
}

function restoreControls () {
  const fromCurrency = sessionStorage.getItem('fromCurrency')
  if (fromCurrency) {
    document.getElementById('from').value = fromCurrency
  }

  const toCurrency = sessionStorage.getItem('toCurrency')
  if (toCurrency) {
    document.getElementById('to').value = toCurrency
  }
}

export default { checkFields, callbackAPI, saveControls, restoreControls, API_URL, API_TOKEN, API_ENDPOINT_LATEST }

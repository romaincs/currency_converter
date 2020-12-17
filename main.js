import utils from './utils'

utils.restoreControls()

document.getElementById('convert').addEventListener('click', (evt) => {
  const input = document.getElementById('input').value
  const fromCurrency = document.getElementById('from').value
  const toCurrency = document.getElementById('to').value
  const save = document.getElementById('save').checked

  if (save) {
    utils.saveControls(fromCurrency, toCurrency)
  }

  const error = utils.checkFields(input, fromCurrency, toCurrency)

  if (error === false) {
    document.getElementById('result-value').innerHTML = '<i>Loading</i>'
    const url = utils.API_URL + utils.API_ENDPOINT_LATEST + '?' +
                'access_key=' + utils.API_TOKEN +
                '&base=' + fromCurrency +
                '&symbols=' + toCurrency

    const currencyApiRequest = new XMLHttpRequest()
    currencyApiRequest.open('GET', url)
    currencyApiRequest.onload = () => {
      utils.callbackAPI(currencyApiRequest, input, toCurrency)
    }
    currencyApiRequest.send()
  }
})

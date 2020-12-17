import utils from "./utils"

utils.restoreControls()

document.getElementById('convert').addEventListener('click',(evt) => {    

    let input = document.getElementById('input').value,
        fromCurrency = document.getElementById('from').options[document.getElementById('from').options.selectedIndex].text,
        toCurrency = document.getElementById('to').options[document.getElementById('to').options.selectedIndex].text,
        save = document.getElementById('save').checked

    if(save) {
        utils.saveControls(fromCurrency, toCurrency)
    }

    let error = utils.checkFields(input, fromCurrency, toCurrency)

    if(error === false) {
        document.getElementById('result-value').innerHTML = '<i>Loading</i>'
        const url = utils.constants.API_URL + utils.constants.API_ENDPOINT_LATEST + '?'
                + 'access_key=' + utils.constants.API_TOKEN
                + '&base=' + fromCurrency
                + '&symbols=' + toCurrency

        let currencyApiRequest = new XMLHttpRequest()
        currencyApiRequest.open('GET', url)
        currencyApiRequest.onload = () => {
            utils.callbackAPI(currencyApiRequest, input, toCurrency)
        }
        currencyApiRequest.send()
    }
})
import utils from "./utils"

document.getElementById('convert').addEventListener('click',(evt) => {

    document.getElementById('result-value').innerHTML = '<i>Loading</i>'

    let input = document.getElementById('input').value,
        fromCurrency = document.getElementById('from').options[document.getElementById('from').options.selectedIndex].text,
        toCurrency = document.getElementById('to').options[document.getElementById('to').options.selectedIndex].text

    let error = utils.checkFields(input, fromCurrency, toCurrency)

    if(error === false) {
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
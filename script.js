'use strict'

const apiKey = 'Df9vFDqUlTv8VlunHs0Vzu1JKGqfsYmXlGyhvxz7';
const searchUrl = "https://developer.nps.gov/api/v1/parks";

const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
  };

function watchForm() {
    $('.user-request-form').submit(event => {
        event.preventDefault();
        let state = $('#state-list').val();
        let numberOfResults = $('.results-amount').val();
        console.log('Im Working');
        getParks(state, numberOfResults);
    });
}

function formatQuery(params) {
    console.log('query params is working');
    const queryItems = Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );
      return queryItems.join("&");
}

function getParks(query, limit = 10) {
    console.log('request sent');
    const params = {
        stateCode: query,
        limit,
        api_key: apiKey,
      };

    const queryString = formatQuery(params)
    const url = searchUrl + '?' + queryString;

    fetch(url)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
}

function displayResults(responseJson) {
    $('.results-display-container').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.results-display-container').append(`
        <section class="single-result">
            <div class="name-container">
            <a id="website" href="${responseJson.data[i].url}" target="_blank"><h2 id="name">${responseJson.data[i].fullName}</h2></a>
            </div>

            <div class="description-container">
                <h3 id="description">${responseJson.data[i].description}</h3>
            </div>

            <div class="address-container">
                <h4 id="address">${responseJson.data[i].directionsInfo}</h4>
            </div>
        </section>
        `)};
    $('.results-display-container').removeClass('hidden');
}

$(watchForm)
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
    .then(responseJson => console.log(responseJson))
    .catch(error => alert('I smell something fishy'));
}

$(watchForm)
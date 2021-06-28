import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;

  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  // handlers
  async function initApp() {
    alert('Welcome, you can search avia tickets here')
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
    console.log(locations.lastSearch);

  }
});

// document.querySelector('.ticket-card').addEventListener('click', function(e){console.log(e.target)})
// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI
const addFavoriteEvent = document.querySelectorAll('.ticket-card')
const favoriteTicket = document.querySelectorAll('.favorite-item')

  for(let i = 0; i < addFavoriteEvent.length; i++){

  addFavoriteEvent[i].addEventListener('click', function(e){
  if(e.target.classList.contains('waves-effect')){
  
  const img = e.currentTarget.querySelector('img')
  const destination = e.currentTarget.querySelector('.ticket-destination')
  const timePrice = e.currentTarget.querySelector('.ticket-time-price')
  const additionalInfo = e.currentTarget.querySelector('.ticket-additional-info')
  console.log(e.currentTarget)

  ticketsUI.addFavoriteList(img , destination , timePrice, additionalInfo)
} 
else{
  return
}
  })
}

for(let i = 0; i < favoriteTicket.length; i++){
  
  favoriteTicket[i].addEventListener('click' , (e) => {
    e.preventDefault()
  
    if(e.target.classList.contains('waves-effect')) {
      console.log(e.currentTarget)
      const myconfirm = confirm('Do you want to delete this ticket')
      myconfirm ? e.currentTarget.remove() : console.log('not deleted');
    }
  
  })
}








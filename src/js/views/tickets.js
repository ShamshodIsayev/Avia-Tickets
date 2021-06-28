import currencyUI from "./currency";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".tickets-sections .row");
    this.currencySymbol = currency.currencySymbol;
    this.containerFavorite = document.getElementById('dropdown1')

  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";

    tickets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, this.currencySymbol);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  addFavoriteList(img_ ,destination, timePrice, addInfo){

    const favItem = document.createElement('div')
    favItem.classList.add('favorite-item', 'd-flex', 'align-items-start')

    const infoItem = document.createElement('div')
    infoItem.classList.add('favorite-item-info', 'd-flex', 'flex-column')
    const deleteBtn = '<a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" >Delete</a>'
    favItem.appendChild(img_.cloneNode(true))
    favItem.appendChild(infoItem)
    
    const destination_2 = destination.cloneNode(true)
    destination_2.classList.remove('ticket-destination')
    destination_2.style.borderBottom = 'dotted 1px black'

    infoItem.appendChild(destination_2)
    infoItem.appendChild(timePrice.cloneNode(true))
    infoItem.appendChild(addInfo.cloneNode(true))
    infoItem.insertAdjacentHTML('beforeend',deleteBtn)
    ticketsUI.containerFavorite.appendChild(favItem)
    console.log(favItem);
    return favItem
  }

  static emptyMsgTemplate() {
    return `
      <div class="tickets-empty-res-msg">По вашему запросу билетов не найдено.</div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="col s12 m6">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img src="${ticket.airline_logo}" class="ticket-airline-img" />
          <span class="ticket-airline-name">${ticket.airline_name}</span>
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <a class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto"
                >Add to favorites </a>
      </div>
    </div>
    `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;

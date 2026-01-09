const STORAGE = {
  user: 'user_profile',
  stocks: 'stocks_data'
};

function getUser() {
  return JSON.parse(localStorage.getItem(STORAGE.user)) || {
    name: 'Gabriel',
    email: 'gabriel@email.com'
  };
}

function saveUser(data) {
  localStorage.setItem(STORAGE.user, JSON.stringify(data));
}

function getStocks() {
  return JSON.parse(localStorage.getItem(STORAGE.stocks)) || [
    { symbol: 'PETR4', monitor: true },
    { symbol: 'VALE3', monitor: false },
    { symbol: 'ITUB4', monitor: true }
  ];
}

function saveStocks(data) {
  localStorage.setItem(STORAGE.stocks, JSON.stringify(data));
}

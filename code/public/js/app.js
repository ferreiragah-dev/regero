const STORAGE_KEY = 'regero_state';

function getState() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    user: {
      name: 'Gabriel',
      email: 'gabriel@email.com'
    },
    stocks: [
      { symbol: 'PETR4', monitor: true, tf: 'M15' },
      { symbol: 'VALE3', monitor: false, tf: 'M15' }
    ]
  };
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* USER */
function getUser() {
  return getState().user;
}

function saveUser(user) {
  const state = getState();
  state.user = user;
  saveState(state);
}

/* STOCKS */
function getStocks() {
  return getState().stocks;
}

function saveStocks(stocks) {
  const state = getState();
  state.stocks = stocks;
  saveState(state);
}

'use strict'

const logOut = new LogoutButton();

logOut.action = () => {
    ApiConnector.logout(response => {
        if(response) {
            console.log('Выход из личного кабинета!')
            location.reload();
        };
    });
};

ApiConnector.current(response => {
    if(response.success === true) {
        ProfileWidget.showProfile(response.data);
    };

    if(response.success !== true) {
        console.log('Данных пользователя нет в базе данных!');
    };
});

const rates = new RatesBoard();

setInterval(() => {
    ApiConnector.getStocks(response => {
        if(response.success === true) {
            rates.clearTable();
            rates.fillTable(response.data);
        };
    
        if(response.success !== true) {
            console.log('Данные курса валют не получены!');
        };
    });
}, 60000);

const manage = new MoneyManager();

manage.addMoneyCallback = (data) => {
    ApiConnector.addMoney({currency: data.currency, amount: data.amount}, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            // this.setMessage(response.success, response.message === 'fffffff')
        };

        if(response.success !== true) {
            console.log('Данных пользователя нет в базе данных!');
        };
    });
};


// FavoritesWidget.setMessage();

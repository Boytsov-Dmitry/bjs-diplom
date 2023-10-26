'use strict'

const logOut = new LogoutButton();

logOut.action = () => {
    ApiConnector.logout(response => {
        if(response.success === true) {
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
            manage.setMessage(response.success, response.message = 'Баланс успешно пополнен!');
        } else {
            manage.setMessage(response.success, response.message = 'Ошибка пополнения баланса!');
        };
    });
};

manage.conversionMoneyCallback = (data) => {
    console.log(data)
    ApiConnector.convertMoney({ fromCurrency: data.fromCurrency, targetCurrency: data.targetCurrency, fromAmount: data.fromAmount }, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            manage.setMessage(response.success, response.message = 'Конвертация валты успешно произведена!');
        } else {
            manage.setMessage(response.success, response.message = 'Ошибка конвертации валюты!');
        };
    });
};

manage.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney({ to: data.to, currency: data.currency, amount: data.amount }, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            manage.setMessage(response.success, response.message = 'Валюта успешно отправлена!');
        } else {
            manage.setMessage(response.success, response.message = 'Ошибка отправки валюты!');
        };
    });
};

const widget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success === true) {
        widget.clearTable();
        widget.fillTable(response.data);
        manage.updateUsersList(response.data);
    };
});

widget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites({id: data.id, name: data.name}, response => {
        if(response.success === true) {    
            widget.clearTable();
            widget.fillTable(response.data);
            manage.updateUsersList(response.data);
            manage.setMessage(response.success, response.message = 'Пользователь успешно добавлен в список избранных!');
        } else {
            manage.setMessage(response.success, response.message = 'Ошибка при добалении пользователя в список избранных!');
        };
    });
};

widget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success === true) {    
            widget.clearTable();
            widget.fillTable(response.data);
            manage.updateUsersList(response.data);
            manage.setMessage(response.success, response.message = 'Пользователь удален из списка избранных!');
        } else {
            manage.setMessage(response.success, response.message = 'Ошибка при удалении пользователя из списока избранных!');
        };
    });
};
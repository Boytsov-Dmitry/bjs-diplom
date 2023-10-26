"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login({login: data.login, password: data.password}, response => {
        if(response.success !== true) {
            userForm.setLoginErrorMessage(response.error);
        };

        if(response.success === true) {
            console.log('Логин и пароль введены корректно, успешный вход в личный кабинет!')
            location.reload();
        };
    });
};

userForm.registerFormCallback = data => {
    ApiConnector.register({login: data.login, password: data.password}, response => {
        if(response.success !== true) {
            userForm.setRegisterErrorMessage(response.error);
        };

        if(response.success === true) {
            console.log('Логин и пароль не найдены, успешная регистрация личного кабинета!')
            location.reload();
        };
    });
};




"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login({login: data.login, password: data.password}, response => {
        if(response.success !== true) {
            userForm.setLoginErrorMessage(response.error);
        } else {
            location.reload();
        };
    });
};

userForm.registerFormCallback = data => {
    ApiConnector.register({login: data.login, password: data.password}, response => {
        if(response.success !== true) {
            userForm.setRegisterErrorMessage(response.error);
        } else {
            location.reload();
        };
    });
};




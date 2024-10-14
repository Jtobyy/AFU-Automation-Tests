export class LoginPage {
    username_textbox = '#field-r5__control'
    password_textbox = '#field-r6__control'
    login_button = '.___1cheqsb'


    enterUsername(username) {
        cy.get(this.username_textbox).type(username)
    }

    enterPassword(password) {
        cy.get(this.password_textbox).type(password)
    }

    clickLogin() {
        cy.get(this.login_button).click()
    }
}
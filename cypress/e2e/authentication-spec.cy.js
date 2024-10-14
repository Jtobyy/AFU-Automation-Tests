import { DashboardGenericPage } from "./pages/dashboard-generic-page"
import { LoginPage } from "./pages/login-page"


const loginPage = new LoginPage()
const dashboardGenericPage = new DashboardGenericPage()
const adminUser = 'gonyebuchi@inlaks.com'
const adminPass = 'Password77@'

it('system opens', () => {
  cy.visit('https://auditfu.rivetsoftware.ng')
  cy.get('#btn-get-started').click()
})


describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('https://auditfu.rivetsoftware.ng')
    cy.get('#btn-get-started').click()
  })

  
  it('user with valid credentials can login', () => {
    loginPage.enterUsername(adminUser)
    loginPage.enterPassword(adminPass)
    loginPage.clickLogin()
    cy.get('[href="/admin/40/dashboard"] > .breadcrumb').should('contain', 'Dashboard')
  })  

  it.only('user with invalid credentials cannot login', () => {
    cy.on('uncaught:exception', () => {
      return false;
    });
    cy.intercept('POST', 'https://auditfuapi.rivetsoftware.ng/api/Authentication/Login').as('loginRequest')
    
    loginPage.enterUsername('wrongUser@mail.com')
    loginPage.enterPassword('wrongPass')
    loginPage.clickLogin()
    cy.get('[href="/admin/40/dashboard"] > .breadcrumb').should('not.exist')

    cy.wait('@loginRequest').then((interception) => {
      if (interception.response.statusCode === 400) {
        cy.get('.___1wyve02').should('exist');
        cy.get('.___1wyve02 > span').should('contain', 'Invalid credential')
      }
    });    
  })    

  it.only('authorized users can be uniquely identified', () => {
    loginPage.enterUsername(adminUser)
    loginPage.enterPassword(adminPass)
    loginPage.clickLogin()
    
    cy.get('#fui-Tagr9 > .fui-Tag__primaryText').should('contain', 'Godbless Onyebuchi')
  })

  it.only('ensures secure connection via HTTPS', () => {
    cy.location('protocol').should('eq', 'https:')
  })

  it.only('ensures password input is not stored in local storage', () => {
    loginPage.enterUsername(adminUser)
    loginPage.enterPassword(adminPass)
    loginPage.clickLogin()
  
    cy.window().then((win) => {
      expect(win.localStorage.getItem('password')).to.be.null
    })
  })  

  it('users can navigate to request password reset before login in', () => {
    cy.get('[href="/auth/reset-password/request"] > .fui-Button').click()  
    cy.get('#field-r9__control').should('exist')
  })

  it('valid users can request password reset', () => {    
    cy.intercept('POST', 'https://auditfuapi.rivetsoftware.ng/api/User/Forget/Password').as('passwordResetRequest')  
    cy.get('[href="/auth/reset-password/request"] > .fui-Button').click()  
    cy.get('#field-r9__control').type(adminUser)
    cy.get('.___1cheqsb').click()
    
    // Wait for the API response
    cy.wait('@passwordResetRequest').then((interception) => {
      cy.get('.___1xc4dkq').should('exist');
      cy.get('.___1xc4dkq > span').should('contain', 'A reset password link has been sent to your email')
    });
  })

  it('invalid users cannot request password reset', () => {
    // Intercept the API call
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.intercept('POST', 'https://auditfuapi.rivetsoftware.ng/api/User/Forget/Password').as('passwordResetRequest')
    
    // Click the button to trigger the request
    cy.get('[href="/auth/reset-password/request"] > .fui-Button').click()  
    cy.get('#field-r9__control').type('wrongUser@mail.com')
    cy.get('.___1cheqsb').click()
    
    // Wait for the API response
    cy.wait('@passwordResetRequest').then((interception) => {
      if (interception.response.statusCode === 400) {
        cy.get('.___1wyve02').should('exist');
      }
    });
  })

  it.only('users can logout of their sessions from the system', () => {  
    loginPage.enterUsername(adminUser)
    loginPage.enterPassword(adminPass)
    loginPage.clickLogin()
    cy.intercept('POST', 'https://auditfuapi.rivetsoftware.ng/api/Authentication/Login').as('loginRequest')

    cy.wait('@loginRequest').then((interception) => {
      cy.get(dashboardGenericPage.drawer_button).click()
      cy.get(dashboardGenericPage.logout_button_textbox).should('contain', 'Logout')
      cy.get(dashboardGenericPage.logout_button).click()
  
      cy.get('#btn-get-started').should('exist')    
    });    
    
  })
})
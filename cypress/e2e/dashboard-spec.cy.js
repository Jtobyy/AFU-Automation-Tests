import { LoginPage } from "./pages/login-page"
import { UserManagementPage } from "./pages/user-management-page"
import { DashboardGenericPage } from "./pages/dashboard-generic-page"
import { AuditLogsPage } from "./pages/audit-logs-page"


const loginPage = new LoginPage()
const adminUser = 'gonyebuchi@inlaks.com'
const adminPass = 'Password77@'

const auditLogsPage = new AuditLogsPage()
const userManagementPage = new UserManagementPage()
const dashboardGenericPage = new DashboardGenericPage()


describe('Dashboard Specs', () => {
    beforeEach(() => {    
        cy.visit('/')
        cy.get('#btn-get-started').click()

        cy.intercept('POST', '/api/User/Dashboard/MDA/Summary').as('dashboardSummaryRequest')

        loginPage.enterUsername(adminUser)
        loginPage.enterPassword(adminPass)
        loginPage.clickLogin()

        cy.wait('@dashboardSummaryRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
    })

    it('admin can login and visit the admin dashboard', () => {
        // login is already done as a precondition

        cy.get('[href="/admin/40/dashboard"] > .breadcrumb').should('contain', 'Dashboard')
        cy.get('#fui-Tagr9 > .fui-Tag__secondaryText').should('contain', 'System Administrator')
    })  

    describe('Operational Metrics on Dashboard', () => {
        it('should display key operational metrics on the dashboard', () => {        
            cy.get('[style="box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 0px; width: 100%; height: auto; padding: 32px 48px 0px;"]').should('be.visible');
        });

        it('should allow admin to monitor user accounts on the dashboard', () => {   
            // navbar is visible
            cy.get(dashboardGenericPage.dashboard_navbar).should('be.visible')  

            // click on users
            cy.get(dashboardGenericPage.userModule_button).click()    

            // validate what is shown on the users module
            cy.get(userManagementPage.userManagementView).should('exist')
            cy.get(userManagementPage.usersTable_header).should('be.visible')
            
            // ability to add user
            cy.get(userManagementPage.addUser_button).should('be.visible')
            cy.get(userManagementPage.filterViews).should('be.visible')
            cy.get(userManagementPage.searchBox).should('be.visible')
        });

        it('should display system components and configurations on the dashboard', () => {
            cy.get(dashboardGenericPage.dashboard_navbar).should('be.visible')

            cy.get(dashboardGenericPage.mdaTools_button).should('contain', 'MDA Tools')
            cy.get(dashboardGenericPage.auditTools_button).should('contain', 'Audit Tools')
            cy.get(dashboardGenericPage.userModule_button).should('contain', 'Users')
            cy.get(dashboardGenericPage.auditLogs_button).should('contain', 'Audit Logs')
        });
        
        it('should allow admin to see real time stats on the number of users on the dashboard', () => {        
            cy.get(dashboardGenericPage.dashboard_navbar).should('be.visible')

            cy.get(dashboardGenericPage.usersOverviewCountBox).should('be.visible')
            cy.get(dashboardGenericPage.usersOverviewCountTitle).should('contain', 'Users')
            cy.get(dashboardGenericPage.usersOverviewCount).should('be.visible')
        });

        it('dashboard provides accurate information regarding the activation status (e.g., active, inactive) of all user accounts.', () => {        
            cy.get(dashboardGenericPage.dashboard_navbar).should('be.visible')
        
            cy.get(dashboardGenericPage.userModule_button).click()    
        
            // Validate what is shown on the users module
            cy.get(userManagementPage.userManagementView).should('exist')
            cy.get(userManagementPage.usersTable_header).should('be.visible')
            cy.get(userManagementPage.statusTitle).should('contain', 'Status')
        
            cy.get(userManagementPage.statusOfFirstItem)
            .should('be.visible')
            .invoke('text')
            .then((statusText) => {
                expect(statusText.toLowerCase()).to.match(/(active|inactive)/);
            });
        });  
        
        it('dashboard displays real time statistics of the active roles in the system.', () => {        
            cy.get(dashboardGenericPage.dashboard_navbar).should('be.visible')
        
            cy.get(dashboardGenericPage.userModule_button).click()    
        
            cy.get(userManagementPage.userManagementView).should('exist')
            cy.get(userManagementPage.usersTable_header).should('be.visible')
            cy.get(userManagementPage.roleTitle).should('contain', 'Role')
        
            cy.get(userManagementPage.roleOfFirstItem).should('be.visible')
        });   
        
        it('dashboard provides a visual representation (e.g., pie chart, bar graph) of the distribution of user roles within the system.', () => {
            cy.get(dashboardGenericPage.dashboard_navbar).should('be.visible')
            cy.get(dashboardGenericPage.barChart).should('be.visible')
        });
        
        it('dashboard displays real time statistics of the activity logs of the system', () => {   
            cy.get(dashboardGenericPage.dashboard_navbar).should('be.visible')  

            cy.get(dashboardGenericPage.auditLogs_button).click()    

            cy.get(userManagementPage.userManagementView).should('exist')
            cy.get(userManagementPage.usersTable_header).should('be.visible')
            
            cy.get(auditLogsPage.auditLogsView).should('be.visible')
            cy.get(auditLogsPage.filterViews).should('be.visible')
            cy.get(auditLogsPage.searchBox).should('be.visible')
        });
    });


    describe('Admin permissions', () => {
        it('ensures that the system administrator can assign roles to users', () => {   
            const randomString = dashboardGenericPage.getRandomString(); 

            const randomFirstName = `Joseph${randomString}`;
            const randomLastName = `Tobi${randomString}`;
            const randomEmail = `testuser${randomString}@example.com`;

            cy.get(dashboardGenericPage.userModule_button).click()    
            
            cy.get(userManagementPage.addUser_button).should('be.visible')
            cy.get(userManagementPage.addUser_button).click()
            cy.get(userManagementPage.addNewUserFirstName_input).type(randomFirstName)
            cy.get(userManagementPage.addNewUserLastName_input).type(randomLastName)
            cy.get(userManagementPage.addNewUserEmail_input).type(randomEmail)
            cy.get(userManagementPage.addNewUserRole_select).click()
            
            cy.get(userManagementPage.addNewUserRole_listBox) 
            .within(() => {
                cy.contains('External Auditor')
                .click({ force: true });
            });

            cy.get('#field-rk__control' ).should('contain', 'External Auditor')
        });

        it('ensures that the system administrator can create a new user', () => {   
            const randomString = dashboardGenericPage.getRandomString(); 

            const randomFirstName = `Joseph${randomString}`;
            const randomLastName = `Tobi${randomString}`;
            const randomEmail = `testuser${randomString}@example.com`;

            cy.get(dashboardGenericPage.userModule_button).click()    
            
            cy.get(userManagementPage.addUser_button).should('be.visible')
            cy.get(userManagementPage.addUser_button).click()
            cy.get(userManagementPage.addNewUserFirstName_input).type(randomFirstName)
            cy.get(userManagementPage.addNewUserLastName_input).type(randomLastName)
            cy.get(userManagementPage.addNewUserEmail_input).type(randomEmail)
            cy.get(userManagementPage.addNewUserRole_select).click()
            
            cy.get(userManagementPage.addNewUserRole_listBox) 
            .within(() => {
                cy.contains('External Auditor')
                .click({ force: true });
            });

            cy.intercept('POST', '/api/User/Create').as('createUser')          
            cy.get(userManagementPage.addNewUserMDASubmit_button).click()
            
            cy.wait('@createUser').then(() => {
                cy.get(':nth-child(1) > :nth-child(2) > .fui-TableCellLayout > .fui-TableCellLayout__content > .fui-TableCellLayout__main > div > :nth-child(2)').should('contain', `${randomFirstName} ${randomLastName}`)
            });
        });
        
        it('system administrator can manage users on the system', () => {   
            // click on users
            cy.get(dashboardGenericPage.userModule_button).click()    

            // validate what is shown on the users module
            cy.get(userManagementPage.userManagementView).should('exist')
            cy.get(userManagementPage.usersTable_header).should('be.visible')
            
            // ability to add user
            cy.get(userManagementPage.addUser_button).should('be.visible')

            // ability to filter users
            cy.get(userManagementPage.filterViews).should('be.visible')

            // ability to search for users
            cy.get(userManagementPage.searchBox).should('be.visible')

            // ability to update user details
            cy.get(userManagementPage.editButtonOfFirstItem).click()
            cy.get(userManagementPage.dialogView).should('be.visible')
            cy.get('#dialog-title-re').should('contain', 'Edit User')
            cy.get(userManagementPage.dialogViewClose_button).click()
        });

        it('system administrator can delete users on the system', () => {   
            // create test user
            const randomString = dashboardGenericPage.getRandomString(); 

            const randomFirstName = `Joseph${randomString}`;
            const randomLastName = `Tobi${randomString}`;
            const randomEmail = `testuser${randomString}@example.com`;

            cy.get(dashboardGenericPage.userModule_button).click()    
            
            cy.get(userManagementPage.addUser_button).should('be.visible')
            cy.get(userManagementPage.addUser_button).click()
            cy.get(userManagementPage.addNewUserFirstName_input).type(randomFirstName)
            cy.get(userManagementPage.addNewUserLastName_input).type(randomLastName)
            cy.get(userManagementPage.addNewUserEmail_input).type(randomEmail)
            cy.get(userManagementPage.addNewUserRole_select).click()
            
            cy.get(userManagementPage.addNewUserRole_listBox) 
            .within(() => {
                cy.contains('External Auditor')
                .click({ force: true });
            });

            cy.intercept('POST', '/api/User/Create').as('createUser')          
            cy.get(userManagementPage.addNewUserMDASubmit_button).click()
            
            cy.wait('@createUser').then((interception) => {
                cy.get(':nth-child(1) > :nth-child(2) > .fui-TableCellLayout > .fui-TableCellLayout__content > .fui-TableCellLayout__main > div > :nth-child(2)').should('contain', `${randomFirstName} ${randomLastName}`)
            });

            // ability to delete user details
            cy.get(userManagementPage.deleteButtonOfFirstItem).click()
            cy.get(userManagementPage.dialogView).should('be.visible')
            cy.get('#dialog-title-rg').should('contain', 'Delete User')

            // delete dialogue
            cy.get('[style="background-color: rgb(220, 53, 69); border-color: rgb(220, 53, 69); color: rgb(255, 255, 255);"]').click()            

            // confirm delete
            cy.get(':nth-child(1) > :nth-child(2) > .fui-TableCellLayout > .fui-TableCellLayout__content > .fui-TableCellLayout__main > div > :nth-child(2)').should().not('contain', `${randomFirstName} ${randomLastName}`)            
        });

        it('ensures activity log is recorded in a chronological order', () => {   
            cy.get(dashboardGenericPage.dashboard_navbar).should('be.visible')  

            cy.get(dashboardGenericPage.auditLogs_button).click()    

            cy.get(dashboardGenericPage.table_header).should('exist')

            cy.get(auditLogsPage.auditLogsLatestAction1)
                .invoke('text')
                .then((text) => {
                    expect(text).to.match(/DashboardCount|MDAUserSummary/);
                });
            cy.get(auditLogsPage.auditLogsLatestAction2)
                .invoke('text')
                .then((text) => {
                    expect(text).to.match(/DashboardCount|MDAUserSummary/);
                });

            cy.get(auditLogsPage.auditLogsLatestAction3).should('contain', 'Create')
            cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > [style="display: flex; align-items: center;"] > .fui-TableCellLayout > .fui-TableCellLayout__content > .fui-TableCellLayout__main').should('contain', dashboardGenericPage.adminName)

            // * Also Logs should not be editable
        });
    })
})
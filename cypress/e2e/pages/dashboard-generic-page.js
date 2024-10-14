export class DashboardGenericPage {
    dashboard_navbar = '[style="box-sizing: border-box; display: flex; justify-content: flex-start; align-items: flex-start; gap: 4px; width: 100%; height: 30px; background-color: rgb(14, 97, 55); padding: 0px 48px;"]'

    mdaTools_button = '[href="/admin/40/mda-tools/mdas"] > .breadcrumb'
    auditTools_button = '[href="/admin/40/audit-tools/audit-categories"] > .breadcrumb'
    userModule_button = '[href="/admin/40/user-management/users"] > .breadcrumb'
    auditLogs_button = '[href="/admin/40/reports/audit-logs"] > .breadcrumb'
    usersOverviewCountBox = '[style="box-sizing: border-box; display: grid; grid-template-columns: repeat(4, 1fr); width: 100%; height: 150px; border: 3px solid rgb(238, 240, 244); border-radius: 10px;"] > :nth-child(2)'
    usersOverviewCountTitle = ':nth-child(2) > p'
    usersOverviewCount = '[style="box-sizing: border-box; display: grid; grid-template-columns: repeat(4, 1fr); width: 100%; height: 150px; border: 3px solid rgb(238, 240, 244); border-radius: 10px;"] > :nth-child(2) > span'
    table_header = '.fui-DataGridHeader > .fui-DataGridRow'

    barChart = '[style="box-sizing: border-box; width: 100%; height: auto; padding: 16px; border: 3px solid rgb(238, 240, 244); border-radius: 10px; flex: 1 1 0%;"]'
    adminName = 'Godbless Onyebuchi'
    drawer_button = '.appmagic-image-inner'
    
    logout_button_textbox = '.ps-menu-root > :nth-child(1) > :nth-child(6) > [data-testid="ps-menu-button-test-id"] > .ps-menu-label'
    logout_button = '.ps-menu-root > :nth-child(1) > :nth-child(6) > [data-testid="ps-menu-button-test-id"]'

    getRandomString() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5); 
    }
}
export class UserManagementPage {
    addUser_button = '.___yn3goz0'
    usersTable_header = '.fui-DataGridHeader > .fui-DataGridRow'
    userManagementView = '[style="box-sizing: border-box; display: flex; justify-content: flex-start; align-items: flex-start; gap: 4px; width: 100%; height: 30px; background-color: rgb(14, 97, 55); padding: 0px 48px;"]'
    filterViews = ':nth-child(1) > [style="box-sizing: border-box; display: flex; justify-content: flex-start; align-items: stretch; gap: 16px; width: 100%; height: auto;"]'
    searchBox = '.fui-Input'

    statusTitle = ':nth-child(5) > .fui-DataGridHeaderCell__button'
    roleTitle = ':nth-child(4) > .fui-DataGridHeaderCell__button'
    statusOfFirstItem = '.fui-DataGridBody > :nth-child(1) > :nth-child(6)'
    roleOfFirstItem = '.fui-DataGridBody > :nth-child(1) > :nth-child(6)'
    editButtonOfFirstItem = ':nth-child(1) > [style="padding-top: 8px; padding-bottom: 8px; min-height: 50px;"] > div > [aria-label="Edit"]'
    deleteButtonOfFirstItem = ':nth-child(1) > [style="padding-top: 8px; padding-bottom: 8px; min-height: 50px;"] > div > [aria-label="Delete"]'

    dialogView = '.fui-DialogSurface'
    dialogViewClose_button = '.___1bsce5w'

    addNewUserFirstName_input = '#firstName > .fui-Input'
    addNewUserLastName_input = '#lastName > .fui-Input'
    addNewUserEmail_input = '#email > .fui-Input'
    addNewUserRole_select = '#field-rk__control'
    addNewUserMDA_select = '#field-rm__control'
    addNewUserRole_dropdownIcon = '#field-rk__control > .fui-Dropdown__expandIcon'

    addNewUserRole_listBox = 'div#fluent-listboxrl.fui-Listbox.fui-Dropdown__listbox.___1te21m2'

    addNewUserMDASubmit_button = '.fui-DialogActions > .___1s1qfqw'
}
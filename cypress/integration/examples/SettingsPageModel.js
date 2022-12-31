class SettingPage {


    mainNavigationSideBar() {

        return cy.get('a[data-test="main-navigation-settings"]').click()
    }


    mainAppSideBar() {

        const organization = cy.get('div[class^="sidebar"]').contains('Organization').click()
        const teams = cy.get('a').find('span:visible').contains('Teams').click()
        return [organization, teams];
    }
}


export default SettingPage;
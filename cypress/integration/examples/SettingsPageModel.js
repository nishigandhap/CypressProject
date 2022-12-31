class SettingPage {


    mainNavigationSideBar() {

        return cy.get('a[data-test="main-navigation-settings"]').click()
    }

    mainAppSideBar(appSideBar, appName) {
        const appSideBar1 = cy.get('div[class^="sidebar"]').find('div h6').contains(appSideBar).click()
        const appName1 = cy.get('a').find('span:visible').contains(appName).click()
        return [appSideBar1, appName1];
    }
}

export default SettingPage;
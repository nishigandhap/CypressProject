/// <reference types ="Cypress"/>

import SettingPage from './SettingsPageModel'
import TeamCreation from './TeamPageModel'


describe('My first test suite', function () {

    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.loginPage = data
        })
    })

    it('End-to-End create custom channel and verified the channel is displayed on the dashboard', function () {
        this.channelName = new TeamCreation()
        cy.visit(Cypress.env("url"))
        cy.get('input[name="email"]').type(this.loginPage.userName)
        cy.get('input[name="password"]').type(this.loginPage.password)
        cy.get('button[type="submit"]').click()
        cy.get('a[data-test="main-navigation-settings"]').click()
        cy.get('div[class*="t-text-mobile"]:visible').contains('Settings')
        cy.get('div[class^="sidebar"]').contains('Channels').click()
        cy.get('a').find('span:visible').contains('Custom').click()
        cy.get('.settings-landing-title').should('contain.text', 'Custom channel')
        cy.get('button[type="submit"]:visible').contains('add').click()
        cy.get('.form-control:visible').clear().type('Custom1').invoke('val').then(function (channelNameList) {
            this.channelName = channelNameList
            cy.log(this.channelName)

        })

        cy.get('.box:visible').find('h2').contains('Access')
        cy.get('.multiselect__tag:visible').find('span').should('have.text', 'Test')
        cy.contains('Create channel').click()
        //cy.contains('The channel has been created sucessfully.')
        cy.wait(5000)
        cy.get('.row-inner').find('a[class*="ml-2 flex items-center"]').contains('Back to overview').click()
        cy.get('.settings-landing-title').should('contain.text', 'Custom channel')
        this.channelName.compareChannelName(this.channelName)
    })

    it('Create team channel and verify the team name is populate on the dashboard', function () {
        this.teamName = new TeamCreation()
        this.settingsPage = new SettingPage()
        cy.visit(Cypress.env("url"))
        cy.get('input[name="email"]').type(this.loginPage.userName)
        cy.get('input[name="password"]').type(this.loginPage.password)
        cy.get('button[type="submit"]').click()
        this.settingsPage.mainNavigationSideBar()
        this.settingsPage.mainAppSideBar()
        cy.get('.settings-landing-title').should('contain.text', 'Teams')
        cy.url().should('include', '/admin/teams')
        cy.get('i[class^="material-icons"]:visible').contains('add').click()
        cy.get('div[class^="t-text-mobile-h5"]').should('have.text', 'Create team')
        cy.get('input[data-test="input"]').type('Sigma').invoke('val').then(function (teamNameText) {
            this.teamName = teamNameText
            cy.log(this.teamName)
        })
        cy.get('.multiselect__select:visible').first().click()
        cy.get('.multiselect__element:visible').find('span').contains('Nishi Patil').click()
        cy.get('button').contains(' Create team ').click()
        // cy.contains('Team was created sucessfully')
        cy.wait(3000)
        this.teamName.compareTeamName(this.teamName)
    })

    it('Delete the team  and verify the team is not visible', function () {
        this.teamName = new TeamCreation()
        this.settingsPage = new SettingPage()
        cy.visit(Cypress.env("url"))
        cy.get('input[name="email"]').type(this.loginPage.userName)
        cy.get('input[name="password"]').type(this.loginPage.password)
        cy.get('button[type="submit"]').click()
        this.settingsPage.mainNavigationSideBar()
        this.settingsPage.mainAppSideBar()
        cy.get('.settings-landing-title').should('contain.text', 'Teams')
        cy.url().should('include', '/admin/teams')
        cy.get('.row-row').find('span').last().click()
        cy.get('button[data-test="delete-team"]').contains('Delete team').click()
        cy.get('.t-dialog-content:visible').should('be.visible')
        cy.get('div').should('have.class', 'title')
        cy.get('button:visible').contains(' Delete').click()
        cy.get('.row-row').find('span').should('not.have.value', this.teamName)
    })
}) 
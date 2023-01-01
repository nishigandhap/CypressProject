/// <reference types ="Cypress"/>

import SettingPage from './SettingsPageModel'
import TeamCreation from './TeamPageModel'
import ChannelCreation from './ChannelCreationModel'

const channelName = new ChannelCreation()
const settingsPage = new SettingPage()
const teamName = new TeamCreation()

describe('My first test suite', function () {

    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.loginPage = data
        })
    })
    it('Create custom channel and verify the channel is displayed on the dashboard', function () {
        cy.visit(Cypress.env("url"))
        cy.get('input[name="email"]').type(this.loginPage.userName)
        cy.get('input[name="password"]').type(this.loginPage.password)
        cy.get('button[type="submit"]').click()
        settingsPage.mainNavigationSideBar()
        cy.wait(2000)
        settingsPage.mainAppSideBar('Channels', 'Custom')
        cy.get('.settings-landing-title').should('contain.text', 'Custom channel')
        cy.get('button[type="submit"]:visible').contains('add').click()
        channelName.captureChannelName()
        cy.get('.box:visible').find('h2').contains('Access')
        cy.get('.multiselect__tag:visible').find('span').should('have.text', 'Test')
        cy.contains('Create channel').click()
        //cy.contains('The channel has been created sucessfully.')
        cy.wait(2000)
        cy.get('.row-inner').find('a[class*="ml-2 flex items-center"]').contains('Back to overview').click()
        cy.get('.settings-landing-title').should('contain.text', 'Custom channel')
        channelName.compareChannelName()
    })

    it('Create team channel and verify the team name is populate on the dashboard', function () {
        cy.visit(Cypress.env("url"))
        cy.get('input[name="email"]').type(this.loginPage.userName)
        cy.get('input[name="password"]').type(this.loginPage.password)
        cy.get('button[type="submit"]').click()
        settingsPage.mainNavigationSideBar()
        settingsPage.mainAppSideBar('Organization', 'Teams')
        cy.get('.settings-landing-title').should('contain.text', 'Teams')
        cy.url().should('include', '/admin/teams')
        cy.get('i[class^="material-icons"]:visible').contains('add').click()
        cy.get('div[class^="t-text-mobile-h5"]').should('have.text', 'Create team')
        teamName.captureTeamName()
        cy.get('.multiselect__select:visible').first().click()
        cy.get('.multiselect__element:visible').find('span').contains('Nishi Patil').click()
        cy.get('button').contains(' Create team ').click()
        // cy.contains('Team was created sucessfully')
        cy.wait(2000)
        teamName.compareTeamName()
    })

    it('Update channel with new team name', function () {
        cy.visit(Cypress.env("url"))
        cy.get('input[name="email"]').type(this.loginPage.userName)
        cy.get('input[name="password"]').type(this.loginPage.password)
        cy.get('button[type="submit"]').click()
        settingsPage.mainNavigationSideBar()
        cy.wait(2000)
        settingsPage.mainAppSideBar('Channels', 'Custom')
        cy.get('.settings-landing-title').should('contain.text', 'Custom channel')
        cy.get('.row-row').contains(this.channelNameText).click()
        cy.get('.multiselect__select').first().click()
        cy.get('.multiselect__element:visible').find('span').contains(this.teamName).click()
        cy.get('button:visible').contains('Update channel').click()
    })

    it('Delete the team  and verify the team is not visible', function () {
        cy.visit(Cypress.env("url"))
        cy.get('input[name="email"]').type(this.loginPage.userName)
        cy.get('input[name="password"]').type(this.loginPage.password)
        cy.get('button[type="submit"]').click()
        settingsPage.mainNavigationSideBar()
        settingsPage.mainAppSideBar('Organization', 'Teams')
        cy.get('.settings-landing-title').should('contain.text', 'Teams')
        cy.url().should('include', '/admin/teams')
        cy.get('.row-row').find('span').last().click()
        cy.get('button[data-test="delete-team"]').contains('Delete team').click()
        cy.get('.t-dialog-content:visible').should('be.visible')
        cy.get('div').should('have.class', 'title')
        cy.get('button:visible').contains(' Delete').click()
        cy.get('.row-row').find('span').should('not.have.value', this.teamName)
    })

    it('Check in custom the deleted team name is not visible', function () {
        cy.visit(Cypress.env("url"))
        cy.get('input[name="email"]').type(this.loginPage.userName)
        cy.get('input[name="password"]').type(this.loginPage.password)
        cy.get('button[type="submit"]').click()
        settingsPage.mainNavigationSideBar()
        cy.wait(2000)
        settingsPage.mainAppSideBar('Channels', 'Custom')
        cy.get('.settings-landing-title').should('contain.text', 'Custom channel')
        cy.get('.row-row').contains(this.channelNameText).click()
        cy.get('.multiselect__select').first().click()
        cy.get('.multiselect__element:visible').find('span').should('not.have.value', this.teamName)
    })
})
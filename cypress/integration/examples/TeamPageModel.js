class TeamCreation {
    constructor() {
   
        this.teamName
    }
    captureTeamName() {
        cy.get('input[data-test="input"]').type('Sigma').invoke('val').then(function (teamNameText) {
            this.teamName = teamNameText
            cy.log(this.teamName)
        })
    }

    compareTeamName() {
        return cy.get('.row-row').find('span').last().invoke('text').then(function (teamNameList) {
            expect(teamNameList).is.equal(this.teamName)
            cy.log(this.teamName)
        })
    }
}
export default TeamCreation;

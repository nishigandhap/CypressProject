class TeamCreation {

    compareTeamName() {
        return cy.get('.row-row').find('span').last().invoke('text').then(function (teamNameList) {
            expect(teamNameList).is.equal(this.teamName)
            cy.log(this.teamName)
        })
    }


    compareChannelName() {

        return cy.get('.setting-sidebar-list').find('li').last().invoke('text').then(function (channelNameList) {
            expect(channelNameList.trim()).is.equal(this.channelName)
            cy.log(this.channelName)
        })


    }

}
export default TeamCreation;
class ChannelCreation {

    constructor() {

        this.channelNameText
    }

    captureChannelName() {
        cy.get('.form-control:visible').clear().type('Custom1').invoke('val').then(function (channelNameList) {
            this.channelNameText = channelNameList
            cy.log(this.channelNameText)
        })
    }

    compareChannelName() {
        return cy.get('.setting-sidebar-list').find('li').last().invoke('text').then(function (channelNameList) {
            expect(channelNameList.trim()).is.equal(this.channelNameText)
            cy.log(this.channelNameText)
        })
    }
}

export default ChannelCreation;
describe('Album forms', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/gallery')
    })

    it('should to have button and open create Album form', () => {
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(1)').click();
        cy.get('.MuiDialog-paper form h2').contains('Create Album');
    })


    it('should to open edit Album form', () => {
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(2)').click();
        cy.get('img[action="true"]').first().click({ force: true });
        cy.get('.MuiDialog-paper form h2').contains('Edit Album');
    })


    it('should be able to delete Album', () => {
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(3)').click();
        cy.get('img[action="true"]').first().click({ force: true });
        cy.get('.MuiDialog-paper h2').contains('Do you want to delete?');
    })
})
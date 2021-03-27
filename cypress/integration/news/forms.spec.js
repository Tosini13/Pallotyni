describe('News forms', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/news')
    })

    it('should to have button and open create news form', () => {
        cy.contains('News');
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(1)').click();
        cy.get('.MuiDialog-paper form h2').contains('Create News');
    })


    it('should to open edit news form', () => {
        cy.contains('News');
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(2)').click();
        cy.get('div[edition="true"]:nth-child(3)').click();
        cy.get('.MuiDialog-paper form h2').contains('Edit News');
    })


    it('should be able to delete news', () => {
        cy.contains('News');
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(3)').click();
        cy.get('div[edition="true"]:nth-child(3)').click();
        cy.get('.MuiDialog-paper h2').contains('Do you want to delete?');
    })
})
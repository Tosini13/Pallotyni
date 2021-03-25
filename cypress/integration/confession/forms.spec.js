describe('Service forms', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/service')
        cy.get('div[role="tablist"] button:nth-child(2)').click();
    })

    it('should to have button and open create service form', () => {
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(1)').click();
        cy.get('.MuiDialog-paper form h2').contains('Create Confession');
    })


    it('should to open edit service form', () => {
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(2)').click();
        cy.get('p[selectable="true"]').first().click();
        cy.get('.MuiDialog-paper form h2').contains('Edit Confession');
    })


    it('should be able to delete paragraph', () => {
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(3)').click();
        cy.get('p[selectable="true"]').first().click();
        cy.get('.MuiDialog-paper h2').contains('Do you want to delete?');
    })
})
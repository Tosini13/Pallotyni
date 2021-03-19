describe('Service forms', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/service')
    })

    it('should to have button and open create service form', () => {
        cy.contains('Service');
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(1)').click();
        cy.get('.MuiDialog-paper form h2').contains('Create Service');
    })


    it('should to open edit service form', () => {
        cy.contains('Service');
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(2)').click();
        cy.get('p[selectable="true"]').first().click();
        cy.get('.MuiDialog-paper form h2').contains('Edit Service');
    })


    it('should be able to delete paragraph', () => {
        cy.contains('Service');
        cy.get('button.MuiFab-root[tabindex="0"]').click();
        cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(3)').click();
        cy.get('p[selectable="true"]').first().click();
        cy.get('.MuiDialog-paper h2').contains('Do you want to delete?');
    })
})
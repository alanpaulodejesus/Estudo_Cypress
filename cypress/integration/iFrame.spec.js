/// <reference types ="cypress"/>

describe('Iframe', ()=>{

    before(()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(()=>{
        cy.reload();
    })

    it('Pagina web', ()=>{
        cy.get('#frame1').then(iframe=>{
            const body = iframe.contents().find('body');
            cy.wrap(body).find('#tfield')
            .type('funciona?')
            .should('have.value', 'funciona?');
        })
    })

    it('Acessa iframe', ()=>{
        cy.visit('https://www.wcaquino.me/cypress/frame.html');
        cy.get('#otherButton').click();
        cy.on('window:alert', msg=>{
            expect(msg).to.be.equal('Click OK!');
        })
    })

})
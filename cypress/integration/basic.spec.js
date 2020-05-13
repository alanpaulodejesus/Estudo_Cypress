/// <reference types ="cypress"/>

describe('Cypress basic', ()=>{

    it.only('Should visit a page and assert title', ()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');

        cy.title().should('to.be.equal', 'Campo de Treinamento');

        cy.title()
        .should('to.be.equal', 'Campo de Treinamento')
        .and('contain','Campo');

    })

    it('Should find element and click', ()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').type('Teste de Sofware');
        cy.get('#buttonSimple').click();
        //.should('have.value', 'Obrigado!');
        cy.get('#buttonSimple').should('have.value', 'Obrigado!');
    })

})
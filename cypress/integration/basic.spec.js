/// <reference types ="cypress"/>

describe('Cypress basic', ()=>{

    before(()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(()=>{
        cy.reload();
    })

    it('Visitar a pagina ee validar titulo', ()=>{
        
        cy.title().should('to.be.equal', 'Campo de Treinamento');
        cy.title()
        .should('to.be.equal', 'Campo de Treinamento')
        .and('contain','Campo');

    })

    it('Should find element and click', ()=>{
        cy.get('#formNome').type('Teste de Sofware');
        cy.get('#buttonSimple').click();
        //.should('have.value', 'Obrigado!');
        cy.get('#buttonSimple').should('have.value', 'Obrigado!');
    })

    it('Verificar texto na tela', ()=>{
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...');
        cy.get('.facilAchar').should('contain', 'armadilhas...');
        cy.get('span').should('contain', 'Cuidado');
    })

    it('Clicar link', ()=>{
        cy.get('[href="#"]').click();
        cy.reload();
        cy.get('[href="#"]').click();
        cy.get('#resultado').should('have.text', 'Voltou!');
    })

    it('Campo texto', ()=>{
        cy.get('#formNome').type('Usuario Nome');
        cy.get('#formNome').should('have.value', 'Usuario Nome');
        cy.get('textarea').type('Elemento campo área').clear();
        cy.get('#elementosForm\\:sugestoes').type('Elemento campo área');
    })

    it('Clicar Radio buton', ()=>{
        cy.get('#formSexoFem').click().should('be.checked');
        cy.get('#formSexoMasc').should('not.be.checked');
    })

    it('Clicar CheckBox', ()=>{
        //cy.get('#formComidaPizza').click().should('be.checked');
        cy.get('[name=formComidaFavorita]').click({multiple:true}).should('be.checked');
    })

    it('Clicar ComboBox', ()=>{
        //Obs.: select valida pelo #value a informação é tag
        cy.get('[data-test=dataEscolaridade]').select('Superior').should('have.value', 'superior');
    })

    it('Clicar ComboBox Multiplo', ()=>{
        //Obs.: select multiplo pelo #value o dado de entrada
        cy.get('[data-testid=dataEsportes]').select(['natacao', 'Corrida']);
    })
})

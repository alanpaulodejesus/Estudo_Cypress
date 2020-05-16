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

    it('Uso de find', ()=>{
        cy.get('#buttonList').click();
        cy.get('#lista li').find('span').should('contain', 'Item 1');
        cy.get('#lista li span').should('contain', 'Item 2');
    })

    it('Uso de time out', ()=>{
        cy.get('#buttonDelay').click();
        //cy.get('#novoCampo', {timeout:1000}).should('exist');
        cy.get('#novoCampo').should('exist');
        
    })
    
    
})
describe('Alert', ()=>{

    before(()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(()=>{
        cy.reload();
    })

    it('Alert', ()=>{
        cy.get('#alert').click();
        cy.on('window:alert', msg=>{
            //console.log(msg);
            expect(msg).to.be.equal('Alert Simples');
        })
    })
})

describe('Confirm', ()=>{

    before(()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(()=>{
        cy.reload();
    })

    it('Confirm', ()=>{
        
        cy.on('window:confirm', msg=>{
            expect(msg).to.be.equal('Confirm Simples');
            return false
        })
        cy.on('window:alert', msg=>{
            expect(msg).to.be.equal('Negado');
        })
        cy.get('#confirm').click();
    })
})

describe('Prompt', ()=>{

    before(()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(()=>{
        cy.reload();
    })

    it('Prompt', ()=>{
        
        cy.window().then(win=>{
            cy.stub(win, 'prompt').returns('42')
        })
        cy.on('window:confirm', msg=>{
            expect(msg).to.be.equal('Era 42?');
        })
        cy.on('window:alert', msg=>{
            expect(msg).to.be.equal(':D');
        })
        cy.get('#prompt').click();
    })
})

describe('Validando Mensagens', ()=>{

    before(()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(()=>{
        cy.reload();
    })

    it('Prompt', ()=>{
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
        .then(()=> expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'));

        cy.get('#formNome').type('Alan');
        cy.get('#formCadastrar').click()
        .then(()=> expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'));

        cy.get('[data-cy=dataSobrenome]').type('Paulo');
        cy.get('#formCadastrar').click()
        .then(()=> expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'));

        cy.get('#formSexoMasc').click();
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!');
    })
})


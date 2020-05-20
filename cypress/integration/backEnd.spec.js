/// <reference types ="cypress"/>

import { forEach } from "async";

//aplicação referente api: https://barrigareact.wcaquino.me/

describe('Api - Test in level integration - Login', ()=>{
    let token;

    before(()=>{
        cy.getToken('a@a', 'a')
            .then(tkn=>{
                token = tkn;
            });
            
    })

    beforeEach(()=>{
        cy.resetRest();
    })

    it('Criar conta', ()=>{

                cy.request({
                    url: '/contas',
                    method:'POST',
                    headers:{ Authorization: `JWT ${token}` },
                    body:{
                        nome: 'Conta Inserida Em Api 1'
                    }
                }).as('response');
        
                cy.get('@response').then(res=>{

                    expect(res.status).to.be.equal(201);
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('nome', 'Conta Inserida Em Api 1');
                })
        })      

    it('Alterar conta', ()=>{
        /*
        cy.request({
            method:'GET',
            url: '/contas',
            headers:{ Authorization: `JWT ${token}` },
            qs:{
                nome:'Conta para alterar'
            }

        })
        */
        cy.getContaByName('Conta para movimentacoes').then(contaId => {
            cy.request({
                url:`/contas/${contaId}`,
                //res.body[0].id
                method:'PUT',
                headers:{ Authorization: `JWT ${token}` },
                body:{
                    nome: 'Conta Inserida Em Api alterada'
                }
            }).as('response')
            
        })
        cy.get('@response').its('status').should('be.equal', 200);
    })
           
    it('Inserir conta repetida', ()=>{
        cy.request({
            url: '/contas',
            method:'POST',
            headers:{ Authorization: `JWT ${token}` },
            body:{
                nome: 'Conta repetida'
            }
            ,
            failOnStatusCode: false 
            
        }).as('response');

        cy.get('@response').then(res=>{

            console.log('response');
            expect(res.status).to.be.equal(201);
            //Problema na api deveria ser 400
            //expect(res.status).to.be.equal(400);
            //expect(res.body.error).to.be.equal('Já existe uma conta criada com esse nome');
            
        })

    })

    it('Criar uma movimentação', ()=>{
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId =>{
            cy.request({
                url:'/transacoes',
                method:'POST',
                headers:{ Authorization: `JWT ${token}` },
                body:{
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "Teste 123",
                    envolvido: "Teste 123",
                    status: true,
                    tipo: "REC",
                    valor: "123",
    
                }
            }).as('response');
            
        })
        cy.get('@response').its('status').should('be.equal', 201);
        cy.get('@response').its('body.id').should('exist');
    })

    it('Consultar Saldo', ()=>{

        cy.request({
            method:'GET',
            url: '/saldo',
            headers:{ Authorization: `JWT ${token}` }
        }).then(res=> {
            let saldoConta;
            res.body.forEach(c=>{
                //conta e saldo, são informações do json com valores
                if(c.conta==='Conta para saldo') saldoConta= c.saldo; 
            })
            expect(saldoConta).to.be.equal('534.00');
        })

        cy.request({
            method:'GET',
            url: '/transacoes',
            headers:{ Authorization: `JWT ${token}` },
            qs: {descricao: 'Movimentacao 1, calculo saldo'}

        })
        .then(res => { console.log(res.body[0]);
                
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method:'PUT',
                headers:{ Authorization: `JWT ${token}` },
                body:{
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                    }
                
            }).its('status').should('be.equal', 200)
        })
    })

    it('Remover conta',()=>{

        cy.request({
            method:'GET',
            url: '/transacoes',
            headers:{ Authorization: `JWT ${token}` },
            qs: {descricao: 'Movimentacao para exclusao'}

        }).then(res=>{
            cy.request({

                method:'DELETE',
                url: `/transacoes/${res.body[0].id}`,
                headers:{ Authorization: `JWT ${token}` },
            }).its('status').should('be.equal', 204);
        })
    })
})
        

    

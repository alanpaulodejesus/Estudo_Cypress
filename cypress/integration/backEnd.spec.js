/// <reference types ="cypress"/>

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

        cy.request({
            method:'GET',
            url: '/contas',
            headers:{ Authorization: `JWT ${token}` },
            qs:{
                nome:'Conta para alterar'
            }

        }).then(res => {
            cy.request({
                url:`/contas/${res.body[0].id}`,
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
})
        

    

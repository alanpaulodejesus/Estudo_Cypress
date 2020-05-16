/// <reference types ="cypress"/>

describe('Api - Test in level integration - Login', ()=>{

    it('Back Login', ()=>{
       
        cy.request({
            method: 'POST',
            url:'https://barrigarest.wcaquino.me/signin',
            body:{
                email:"a@a",
                redirecionar: false,
                senha: "a"
            }
        }).its('body.token').should('not.be.empty')
            .then(token=>{
                cy.request({
                    url: 'https://barrigarest.wcaquino.me/contas',
                    method:'POST',
                    headers:{ Authorization: `JWT ${token}` },
                    body:{
                        nome: 'Conta Inserida Em Api 2'
                    }
                }).as('response');
        
        })      
            
        cy.get('@response').then(res=>{

            expect(res.status).to.be.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('nome', 'Conta Inserida Em Api 2');
        })
    })
        

    
})
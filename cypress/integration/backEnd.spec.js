/// <reference types ="cypress"/>

describe.only('Api - Test in level integration - Login', ()=>{
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

    it('Back Login', ()=>{

                cy.request({
                    url: 'https://barrigarest.wcaquino.me/contas',
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
            
})
        

    

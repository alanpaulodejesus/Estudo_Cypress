// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getToken' , (user, passwrd)=>{
    cy.request({
        method: 'POST',
        url:'/signin',
        body:{
            email: user,
            redirecionar: false,
            senha: passwrd
        }
    }).its('body.token').should('not.be.empty')
    .then(token=>{
        return token;
    })
})


Cypress.Commands.add('resetRest',() =>{

    cy.getToken('a@a', 'a').then(token =>{
        cy.request({
            method:'GET',
            url: '/reset',
            headers:{ Authorization: `JWT ${token}` }
        }).its('status').should('be.equal', 200);
    })
    
})

Cypress.Commands.add('getContaByName', name =>{
    cy.getToken('a@a', 'a').then(token =>{
            cy.request({
                method:'GET',
                url: '/contas',
                headers:{ Authorization: `JWT ${token}` },
                qs:{
                    nome:name
                }

            }).then(res =>{
                return res.body[0].id
            })
    })
})
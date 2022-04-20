///<reference types="cypress"/>
import 'cypress-iframe';

describe('845 - UI: Studio Head| Create a Studio Charter',function(){
    it('As a Studiohead, user should be able to add details (limited 1000 words) in studio charter',function(){
        cy.viewport(1280,720)

        cy.visit('http://leaderboard-qa.go1percent.com/')  
        cy.wait(1000)      
              
        cy.get('#kc-page-title').should('contain','Sign in to your account')                         
        cy.get('#username').type('teststudiohead')            
        cy.get('#password').type('teststudiohead')
        cy.get('#kc-login').click()       
        
        cy.wait(3000)

        cy.getCookies()
        Cypress.Cookies.debug(true, { verbose: false })
        // cy.setCookie('1P_JAR', '2022-03-24-07')

        cy.get("span[class='d-sm-inline d-none']").should('have.text','Hi test')    
        cy.title().should('eq','Knoldus Leaderboard')   
        cy.get('.navbar-nav > :nth-child(4) > .nav-link').click()
        cy.get("div[class='card-header text-center px-0 pt-0 head d-flex department-card']").contains(' Account Management ').click()
        cy.wait(5000)
        cy.get("button[class='btn btn-primary text-capitalize my-4 ng-star-inserted']").click();

        cy.frameLoaded('iframe[class="tox-edit-area__iframe"]')
        cy.iframe('iframe[class="tox-edit-area__iframe"]').type('One thing that students must do during their academic lives is writing a 1000 words essay. This can look like an intimidating number, and many students are left wondering how long it can take. A simple search on the internet will give questions such as “how long is a 1000 words essay?” or “how many pages are in that kind of paper?” If you have one of these questions, we have prepared some guidelines that can be used to know an exact number of pages that you will end up with. We will also provide an estimate of how long it will take to write the same length of an essay. Read on for knowing the number of pages will make that kind of paper and how long it takes to create such an essay. Writing is the same: 1000 words are always 1000 words, whatever the topic is, whatever your today writing mood. This doesn’t mean that it is always easy, sometimes it is not and sometimes you look as mesmerized by the blank paper…no ideas, no motion, nothing at all. In this case, a stroll in a park or a coffee break with your friends can play down the impasse and give you new energies.')
        cy.get('.col-md-12 > .me-2').click()
        cy.get('#toast-container > .ng-trigger').should('have.text',' Successfully added the charter in the Database. ')
    })
})

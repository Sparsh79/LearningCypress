///<reference types="cypress"/>


describe("dummy", function(){


    it("dumber",function() {

        cy.writeFile('cypress/fixtures/first.txt', 'first try');
        cy.writeFile('cypress/fixtures/second.txt','first try');

        cy.readFile('cypress/fixtures/first.txt').then(function(jk){
        cy.readFile('cypress/fixtures/second.txt').then(function(lm){
            expect(lm).to.equal(jk)
        })
    })
        // r1.should('eq',r)
        // cy.readFile('cypress/fixtures/first.txt').then((textComapre) =>{
        //     console.log(textComapre.toString)
        // })

})
})
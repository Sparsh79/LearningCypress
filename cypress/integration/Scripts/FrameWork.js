/// <reference types="Cypress" />

describe("Hooks",function(){
    before(function(){         // runs before all test in the block, https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks
        cy.fixture("example").then(function(data)
        {
            this.data = data
            // "this" has to be used, so that we can use this varibale throughout the class.
        })
    })

    it("Sample test to use 'before' hook",function(){
        cy.visit("https://rahulshettyacademy.com/angularpractice/")
        cy.get("input[name='name']:nth-child(2)").type(this.data.name)
        cy.get("select[class='form-control']").select(this.data.gender)

        cy.get(":nth-child(4) > .ng-untouched").should("have.value",this.data.name) // asserted to have same data that we passed on the same statement.
        cy.get("input[name='name']:nth-child(2)").should("have.attr","minlength","2")
        // here, this field has a property which restricts the string length to 2. Here, we are asserting that in HTML property, we have an attribute called
        // minlength, whose value is 2.
    })
    it("Checking for the disabled", function(){
        cy.get("#inlineRadio3").should("be.disabled")
        // this is self explainatory
        cy.contains("Shop").click()
        cy.selectProduct('Nokia') // have created a custom cypress command for it in the command.js file, please refer to that.

    })

})
/// <reference types="Cypress" />

describe("checking out checkboxes", function(){
    it("checkBoxes", function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        //cy.get("input[id='checkBoxOption1']").click();
        // the above command will work and it will check the box, but cypress have given some more options for us to do so. Like mentioned below.
        
        cy.get("input[id='checkBoxOption1']").check().should('be.checked').and("have.value","option1")
        // here, "check" is working as click,  and "be.checked" is asserting that the checBox has been clicked. While have.value is asserting that option1 is being clicked.
        
        cy.get("input[id='checkBoxOption1']").uncheck().should('not.be.checked')
        // this is self explainatory, like check() we have uncheck() as well. And we asserting that it should not be checked now, by using not.be.checked

        cy.get("input[type='checkbox']").check(['option3','option2'])
        // by passing an array of objects, we can checkout multiple checkBoxses via single command.
        // But note that, the attribute passed in the array must be belong to the parent selector. 

        
    })
})
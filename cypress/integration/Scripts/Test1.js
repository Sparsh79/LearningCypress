/// <reference types="Cypress" />

describe("Trying it for the first time",function()
{
    it("first test case",function(){

    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get("input[type='search']").type("ca");
    cy.wait(2000);
    cy.get("div[class='product']").should("have.length",4);

 // parent child chaning.
    cy.get(".products").find(".product").should("have.length",4);

    cy.get(".products").find(".product").eq(2).contains("ADD TO CART").click();
 // eq is for index, I don't find it much useful as we are hardcoding the values here.  


    })

    it("2nd test case",function(){
        
        //test step
    
    })
})
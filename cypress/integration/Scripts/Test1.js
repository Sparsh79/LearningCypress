/// <reference types="Cypress" />

describe("Adding to the cart",function()
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

     cy.get(".products").find(".product").each(($e1,index,$list) => { // "each" is for iterating through the array. 

       var testVeg =  $e1.find("h4[class='product-name']").text();
       if(testVeg.includes('Carrot'))
                $e1.find('button').trigger("click")
                // here the .click is deprectaed, hence we used trigger instead of click().
     })
    })

    it("Checking out cart",function(){
        
        // var logo = cy.get("div[class='brand greenLogo']")
        // cy.log(logo.text())  This doesn't work as we introduced a new varibale, which is not according to the cypress understading of code, thus it makes 
        // asyncrhronus, hence we would have to use ".then" for it.
     cy.get("div[class='brand greenLogo']").then(function(logo)
     {
         cy.log(logo.text())
// one thing to note here, .text() is not a cypress command , it is jquery one.
     });
     cy.get("div[class='brand greenLogo']").should("have.text","GREENKART")
     
     cy.get("a[class='cart-icon']").click();
     cy.get("button[type='button']").contains("PROCEED TO CHECKOUT").click();
     cy.contains("Place Order").click();




    })
})
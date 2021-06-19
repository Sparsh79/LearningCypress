import { Given,When,Then, And } from "cypress-cucumber-preprocessor/steps";

Given("I open an ecommerce page",function(){ // we can make an anonymus function as well here, use "()=>" instead of function() 
    cy.visit("https://rahulshettyacademy.com/angularpractice/")
})

When("I add items to card",()=>{
    cy.contains("Shop").click()
    cy.selectProduct('Nokia') // have created a custom cypress command for it in the command.js file, please refer to that.
    cy.selectProduct('Blackberry')
    cy.contains("Checkout").click()
})

And("Validate the total price",()=>{
    var sum = 0;
    cy.get("h3 strong").each(($ele, index, $list) =>{ // to extarct the amount and assert on their sum        
        const text = $ele.text()
         // it will retunt something like $. 500, we have to remove the special characters from it.
        var amountText = text.split(" ")
        // it will retun something like [₹., 50000]
        amountText  = amountText[1].trim() // this will retun 5000 only.
        sum = Number(sum)+Number(amountText)
    }).then(function(){
        cy.log(sum)
    })
    cy.get("h3 strong").then(function(element){

        var amount = element.text();
        var actualAmount = amount.split(" ");
        actualAmount = actualAmount[1].trim();
        expect(Number(actualAmount)).to.equal(sum)  
    })
})

Then("Click on checkout",()=>{
    cy.contains("Checkout").click()
})

When("We fill the form details",function(dataTable){ //  use read data from cucumber instead of cypress's fixtures. 

    //                                                      |batman| male |
     cy.get("input[name='name']:nth-child(2)").type(dataTable.rawTable[1][0]) // rawTable will convert the dataTable into a multi dimension array.
    cy.get("select[class='form-control']").select(dataTable.rawTable[1][1])

})

Then("validate the behaviour",function(dataTable){

    cy.get("input[name='name']:nth-child(2)").should("have.attr","minlength","2")
    cy.get("#inlineRadio3").should("be.disabled")
})

And("select the shop page",()=>{
    cy.contains("Shop").click()
})
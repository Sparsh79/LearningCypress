/// <reference types="Cypress" />

describe("XHR testing, mocking and integrated testing", function(){

    it("mocking HTTP respons", function(){

        cy.visit("https://rahulshettyacademy.com/angularAppdemo/")

        // syntax     ->    cy.intercept({reqyestObject},{responseObject})
        cy.intercept({
            method: "GET",
            url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty" // remember, cypress will not make this call, cypress will wait for this call to show up in the network
        },
        {
            statusCode:200,    // We are mocking response here, so mock response needs to be passed here.
        body: [
            {
                "book_name": "RestAssured with Java",
                "isbn": "RSU",
                "aisle": "2301"
            }
        ]
    }).as("bookRetrival") // putting an alias for this whole response mocking, so that it can be used again by using bookRetrival keyword only 
    
    cy.get("button[class='btn btn-primary']").click()
    //    cy.wait("@bookRetrival") // we are expliclitly making our test synchronous, by waiting until bookRetrival is resolved.

        // now to test that we are getting the same data that we are getting from the API, we need to put validation on the response from the API
        // here, we have already mocked the response from tha api. However, it doesn't matter, we can put valiadtion on API's response, mocked or not.

        cy.wait("@bookRetrival").should(({request,response})=>{

            cy.get("tr").should("have.length",response.body.length+1)
            // added +1 because first name contains bookname, isbn and aisle


            //response.body.length -> since the mocked repsonse is an array, .lenght will retrieve its lenght, 1, as we mocked response to have only 1 index

// hence what we have done here, is we have validated both the backEnd(API's response) and the of course the frontEnd as well.
// Basically, it is a forntEnd and backEnd integrated testing.
        })

       cy.get("p").should("have.text","Oops only 1 Book available")
    


})



})
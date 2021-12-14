/// <reference types="Cypress" />

describe("Intercepting HTTP to test Security Scenaios like 403",function(){

    it("404 scenario, changing the API request",function(){

        cy.visit("https://rahulshettyacademy.com/angularAppdemo/")

        // cy.intercept(method, url, routeHandler)

        cy.intercept("GET","https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
        (req)=> // captured request in an req varibale, and through this variable, we can modify the request
        {
        req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=bhardwaj" // modified the url
        req.continue((res)=> // catched the response in res
        {
            // here we can play with response and put assertions on it.
            // expect(res.statusCode).to.equal(404)
        })
        }).as("changedRequest")
        cy.get("button[class='btn btn-primary']").click()

        cy.wait("@changedRequest")

    })
})
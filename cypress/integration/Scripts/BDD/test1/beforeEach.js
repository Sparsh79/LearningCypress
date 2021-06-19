beforeEach(function(){         // runs before all test in the block, https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks
    cy.fixture("example").then(function(data)
    {
        this.data = data
        // "this" has to be used, so that we can use this varibale throughout the class.
    })
})
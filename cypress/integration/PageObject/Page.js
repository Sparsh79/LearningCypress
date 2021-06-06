class Page {

    getTotal(){
        return cy.get("h3 strong")
    }
}

export default Page;
// make sure to use export statement at the very last, so that we can import this class in our test cases.
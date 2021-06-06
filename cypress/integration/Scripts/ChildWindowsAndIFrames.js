/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

import 'cypress-iframe'

describe("Handling childWindows",function(){

    it("childWindows",function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        //like child tabs, cypress also cannot support child windows. We have already, covered one of the work around which was to remove the taget attribute form the dom.
        // The cypress community gave the argument that, if we are handling a child window,
        //that means, we are visiting a new url. The community says to simply cy.visit() that url instead of handling the new window.
        // Again, we would have to use HTML concepts here. On we are getting redirected to a new window by clicking on a button. The HTML/dom of the that button 
        // will have a href attribute to it and that will contain the url which is to be visited in the new window. We can simply extarct the value of href attribute and use it.
        // we will use jquery's prop() method to return properties and values of the selected elements.

        // cy.get("a[id='opentab']") --> the button that will redirect us to the new window/tab.
        
        // cy.get("a[id='opentab']").prop('href') --> I think by now, we already conclude that this will not work, as a cypress command with non-cypress command will not work with usig .then.
        
        cy.get("a[id='opentab']").then(function(ele)
        {
            var redirectedURL =  ele.prop("href")

            cy.visit(redirectedURL)
            cy.url().should('includes',"https://www.rahulshettyacademy.com/#/index")
        })
        // Note: the cypress was developed to remove the flakiness or inconsistencies from test. This test woked because the domain of the initial url and the redirected one is same.
        // if the domain had been different, cypress would have thrown an error. This limitation of cypress was intentionally introduced in it, because of security constraint.
        // we can see this in the test. 
    })
    
    // it("childWindow, expected to fail beacuse of url having different domain", function(){
    //     cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    //     cy.wait(2000)
    //     cy.visit("https://www.knoldus.com/home")
    //     // here cypress will throw an error, something like mentioned below
    //     //cy.visit() failed because you are attempting to visit a URL that is of a different origin.
    // })

    it("Handling iFrames", function(){

        // to handle iFrames in cypress, we would have to explicitly add a plugin to the project, we can do so by using the command,
        //npm install -D cypress-iframe
        // then we would have to import that specific package , import 'cypress-iframe'

        cy.frameLoaded("iframe[id='courses-iframe']") // it will load the iframe for this css. It means now cypress will shift its focus to this iframe.
        cy.iframe().find("a[href*='mentorship']").eq(0).click() // .find is used as .get in case of iframes.

        cy.iframe().find("h1[class='pricing-title text-white ls-1']").should('have.length',2) // simple assetion on length of some elements

    })
})
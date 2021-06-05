/// <reference types="Cypress" />


describe("checking out checkboxes, dropDowns etc", function(){
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
    
    it("dropDowns, Dynamic and Static",function()
        {
            // cy.get("select[id='dropdown-class-example']").click();
            // it is a html rule that dropdown are lablled as "select". Hence, .click() will not work for this. We have .select() in place for click() here.

            //Static Dropdown
            cy.get("select[id='dropdown-class-example']").select("option2").should("have.value","option2")

            //Dynamic Dropdown
            cy.get("input[class='inputs ui-autocomplete-input']").type("Ind")

            cy.get(".ui-menu-item div").each(($e1,index,$list)=>{ // use this whenever iterating an array or list

                if($e1.text()==='India') // matching the suggestion with India, is matched then click.
                $e1.trigger("click");

            })
            cy.get("input[class='inputs ui-autocomplete-input']").should("have.value","India")// asserting that India is selected.
        }
    )

    it("Pop-ups",function()
    {
        // the thing to note here is, cypress auto accepts alert, we need not to wite specific code for handling it. 
        cy.get("input[id='alertbtn']").click() // by clicking this, a pop-up will show up and we would have only one option, which is to click on "OK". 

        cy.get("input[value='Confirm']").click() // by clicking this, a pop-up will show up and we can select either "OK" or "cancel"  
        
        // if we are to give these command in the script, it will pass. But we cannot be sure whether the pop-ups got handled or not? 
        //Lets look below, to handle these scenarios.
        // To handle these, we have something called events, windows:alert(), in cypress. We have multiple events in cypress, to learn more, refer to this https://docs.cypress.io/api/events/catalog-of-events#Event-Types

        cy.on("window:alert",(String)=> // .on is used to trigger an event.
        {
            expect(String).to.equal("Hello , share this practice page and share your knowledge") // it again is an mocha assertion.

        }) 
        //window:alert wille fire when your app calls the global window.alert() method. Cypress will auto accept alerts. You cannot change this behavior.
        //Hence, since window:alert is able to capture the popup, we will use mocha assertions to validte it.
        // Do remember that we will not see this in the browser while the execution. 
        
        cy.on("window:confirm",(String)=> // this is the case where we would have to select confirm/OK or cancel from the pop-up.
        {
            expect(String).to.equal("Hello , Are you sure you want to confirm?")
          //  return false, if you don't want to cancel the pop-up.

        })
        //Fires when your app calls the global window.confirm() method. Cypress will auto accept confirmations. 
        //Return false from this event and the confirmation will be canceled. 
    })

    it("Handling child tabs in browser with Jquery", function()
    // Basically, Cypress cannot handle the child tabs.
    // it will be easier to understand this if one may know the concept of target attributes in HTML
    // on inspecting the web element, if we see target='_blank', this means that a new blank tab will get opened and the url in herf atrribute will be opened.
    // Please note that the cypress has the ability to manipulate or modify the dom if needed.
    //Hence what we are trying to do here is, we will remove the target='_blank' from the dom itself and then the herf url will be opened on the same tab instead of a new one. Like given below.
    {
        cy.get("a[id='opentab']").invoke("removeAttr","target").click()
        // we have used here, .invoke, it enables cypress to use jquery functions as to remove attribute we used removeAttr() which is a jquery function.

        cy.url().should("include","www.rahulshettyacademy.com") // to assert that we succesfully move to the redirected url

        //now to go back to the intial page, we can make cypress to use the browser's back button. For this we the the function .go. To understand it use, you may refer https://docs.cypress.io/api/commands/go
        cy.go("back")
    })
    
    it("handling web tables", function()
    {
        cy.get("tr td:nth-child(2)").each(($e1, index, $list) =>
        {
            var text = $e1.text()
            if(text.includes("Selenium Automation in simple Python Language"))
            {
                cy.get("tr td:nth-child(2)").eq(index).next()
                //next() gets the immediately following sibling of each DOM element within a set of DOM elements. https://docs.cypress.io/api/commands/next
                // here we cannot use $e1.next(), it can only be applied to cy.get(), here we would have to use the selector again. However the "index" is getting updated with each iteration.
                // hence .eq(index) will pull out the the index of webElement from the table where we may find the desired text. And then, to that index we can apply the next() command.
                // This here basically shows the sibiling locator strategy 

                // if we use cy.get("tr td:nth-child(2)").eq(index).next().text(), it may pass but it will not extract the text. As text() is a Jquery command, this satement will be asycnronous in nature.
                //Hence to make it syncrhronus, we will have to use then(), this we have already covered in the eralier tests.

                cy.get("tr td:nth-child(2)").eq(index).next().then(function(cost)
                {
                    var costPrice = cost.text()
                    expect(costPrice).to.equal("25")

                })
            } 

        })
    })

    it("Mosue Hover using Jquery's show",function(){

        cy.get("div[class='mouse-hover-content']").invoke('show')
        //we already know what invoke does.
        //Bascially, mouse hover events are not supported in cypress.But we have a solution to handle to as well, as explained in this test and the next test as well.
        //The show() Method in jQuery is used to display the hidden and selected elements. Note: This method display the hidden elements which are using CSS display: none property. 
        //The elements are not visible whose visibility is hidden to show() method.
        // Note: the show method should always be applied to the immediate parent of the hidden hover elements. If applied to super parent or sibling, it won't work. 

        cy.contains("Top").click()
        cy.url().should("includes","top") // to assert that the page has been scrolled to top.

        // In cypress, if we want we can click on hidden element/buttons without usin show jquery method. For this, we can use force click, .click({ force: true })        
    })

    it("Clicking ,osue Hover element using force click",function(){

        cy.contains("Top").click({ force: true }) // this will search for every element, hidden or not, and will click even when the element is hidden.
        //hidden element means, it is only visible after certain actions, like here this element will only be visible when mouse pointer hovers over it.
        // to learn more,refer to this https://docs.cypress.io/api/commands/click#Options 
        cy.url().should("includes","top")
    })

})
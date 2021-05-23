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

})
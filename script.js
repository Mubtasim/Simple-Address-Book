$(document).ready(function() {

    const addresses = {
        1: {
            firstName: "Mubtasim",
            surName: "Shahriar",
            phoneNumber: "01827600970",
            address: "Moghbazar, Dhaka"
        },
        2: {
            firstName: "Donald",
            surName: "Trump",
            phoneNumber: "085484004",
            address: "New York, America"
        },
        3: {
            firstName: "Barack",
            surName: "Obama",
            phoneNumber: "6464646464",
            address: "California, America"
        },
        4: {
            firstName: "Vladimir",
            surName: "Putin",
            phoneNumber: "6916164949",
            address: "Moscow, Russia"
        },
        5: {
            firstName: "Mike",
            surName: "Mirzayanov",
            phoneNumber: "6916164949",
            address: "Mosxow , Russia"
        },
        6: {
            firstName: "The",
            surName: "Tourist",
            phoneNumber: "6916164949",
            address: "Belarus , Poland"
        }
    };


    let total = Object.keys(addresses).length;

    $("#resetButton").click(function() {
        $("input").val("")
    })

    function clearDetailAndEdit() {
        $("#details").html("")
        $("#editArea").attr("style", "display:none")
    }

    
    function render(obj) {
        $(".contactList").empty();
        for(const nowContact in obj) {
            let divHtml = `
                <li class="showContact" id="${nowContact}">
                    <p style="display:none">${nowContact}</p>
                    <p style="display: inline-flex">${obj[nowContact].firstName} ${obj[nowContact].surName}</p>
                    <button class="viewDetails">View</button>
                </li>
            `
            $(".contactList").append(divHtml);
        }



        $(".viewDetails").click(function() {
            clearDetailAndEdit();
            $("input").val("")
            $("#editArea").attr("style", "display:none")
            let contactId = $(this).parent().attr('id');
            let idWithHash = "#" + contactId;
            let nowContact = addresses[contactId];
            let detailDiv = `
                <p style="display:none">${nowContact}</p>
                <p>First Name: ${nowContact.firstName}</p>
                <p>Surname: ${nowContact.surName}</p>
                <p>Phone Number: ${nowContact.phoneNumber}</p>
                <p>Address: ${nowContact.address}</p>
                <button id="delete">Delete</button>
                <button id="edit">Edit</button>
            `
            $("#details").html(detailDiv)
            $("#delete").click(function() {
                delete addresses[contactId]
                clearDetailAndEdit();
                $(idWithHash).remove()
            })
            $("#edit").click(function() {
                $("#editFirstName").val(nowContact.firstName)
                $("#editSurName").val(nowContact.surName)
                $("#editPhoneNumber").val(nowContact.phoneNumber)
                $("#editAddress").val(nowContact.address)
                $("#editArea").attr("style", "display:flex")
                $("#saveEdit").click(function() {
                    nowContact.firstName = $("#editFirstName").val()
                    nowContact.surName = $("#editSurName").val()
                    nowContact.phoneNumber = $("#editPhoneNumber").val()
                    nowContact.address = $("#editAddress").val()
                    clearDetailAndEdit();
                    $("#editArea").attr("style", "display:none")
                    render(addresses)
                })
            })
        })
    }

    render(addresses);

    $("#createButton").click(function() {
        clearDetailAndEdit();
        const newContact = {
            firstName: $("#firstName").val().trim(),
            surName: $("#surName").val().trim(),
            phoneNumber: $("#phoneNumber").val().trim(),
            address: $("#address").val().trim()
        }
        let errors = "";
        if(newContact.firstName == "") {
            if(errors != "") errors += "</br>";
            errors += "First name cannot be empty"
        }
        if(newContact.surName == "") {
            if(errors != "") errors += "</br>";
            errors += "Surname cannot be empty"
        }
        if(newContact.phoneNumber == "") {
            if(errors != "") errors += "</br>";
            errors += "Phone number cannot be empty"
        }
        if(newContact.address == "") {
            if(errors != "") errors += "</br>";
            errors += "Address cannot be empty"
        }
        if(errors == "") {
            total++;
            addresses[total.toString()] = newContact;
            render(addresses);
            $("#createMessage").attr("style", "color: green")
            $("#createMessage").text("Contact created successfully")
            $("#createMessage").show(0).delay(3000).hide(1)
            $("input").val("")
        } else {
            $("#createMessage").attr("style", "color: red")
            $("#createMessage").html(errors)
            $("#createMessage").show()
        }
    })

    $("#searchContact").on('keyup', function() {
        clearDetailAndEdit();
        let valNow = $("#searchContact").val();
        valNow = valNow.trim();
        const searchResult = {};
        for(const nowContact in addresses) {
            let objContact = addresses[nowContact];
            let doesContain = false;
            doesContain |= objContact.firstName.toLowerCase().includes(valNow.toLowerCase());
            doesContain |= objContact.surName.toLowerCase().includes(valNow.toLowerCase());
            doesContain |= objContact.phoneNumber.toLowerCase().includes(valNow.toLowerCase());
            if(doesContain) {
                searchResult[nowContact] = objContact;
            }
        }
        if(Object.keys(searchResult).length!=0) {
            $("#notFound").text("")
            render(searchResult)
        }
        else {
            $("#notFound").text("No contact found")
            render(addresses)
        }
    })


})
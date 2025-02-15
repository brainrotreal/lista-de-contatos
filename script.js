const createButton = document.getElementById("create");
const templateContact = document.getElementById("template");
const concludeButton = document.getElementById("conclude")
const editWindow = document.getElementById("edit-window");
let currentEdit = null
const nameRegex = /^[a-zA-Z\s]+$/;
const phoneRegex = /^\d{2} \d{4,5}-\d{4}$/;

createButton.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const phoneNumber = document.getElementById("tel").value;

    if (!nameRegex.test(name)) {
        alert("Please enter a valid name. Only letters and spaces are allowed.");
        return;
    }

    if (!phoneRegex.test(phoneNumber)) {
        alert("Please enter a valid phone number in the format: 99 99999-9999.");
        return;
    }

    const newContact = templateContact.cloneNode(true);
    newContact.querySelector(".name").innerText = name;
    newContact.querySelector(".phone-number").innerText = `🕻 +55 ${phoneNumber}`;
    document.getElementById("contacts").querySelector("ol").appendChild(newContact);
    document.getElementById("name").value = "";
    document.getElementById("tel").value = "";
    newContact.removeAttribute("id");
    newContact.querySelector(".edit").addEventListener("click", () => {
        if (!currentEdit) {
            editWindow.classList.remove("hide");
            currentEdit = newContact;
            editWindow.querySelector("#edit-name").value = newContact.querySelector(".name").innerText;
            editWindow.querySelector("#edit-tel").value = newContact.querySelector(".phone-number").innerText.slice(7);
        } else {
            alert("Finish editing the current contact before editing another.")
        }
    });

    newContact.querySelector(".delete").addEventListener("click", () => {
        if (currentEdit != newContact) {
            document.querySelector(".Contatos").removeChild(newContact)
        } else {
            alert("Cannot delete a contact while editing.")
        }
    })
});

concludeButton.addEventListener("click", () => {
    const name = document.getElementById("edit-name").value;
    const phoneNumber = document.getElementById("edit-tel").value;

    if (!nameRegex.test(name)) {
        alert("Please enter a valid name. Only letters and spaces are allowed.");
        return;
    }

    if (!phoneRegex.test(phoneNumber)) {
        alert("Please enter a valid phone number in the format: 99 99999-9999.");
        return;
    }

    if (currentEdit) {
        currentEdit.querySelector(".name").innerText = name;
        currentEdit.querySelector(".phone-number").innerText = `🕻 +55 ${phoneNumber}`;
        editWindow.querySelector("#edit-name").value = "";
        editWindow.querySelector("#edit-tel").value = "";
        editWindow.classList.add("hide");
        currentEdit = null;
    } else {
        alert("Please select a contact to edit.");
    }
})

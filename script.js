function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            alert("Copied!");
        },
        () => {
            alert("failed")
        },
    );
}

function maskPassword(pass) {
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str += "*"
    }
    return str
}

const showPasswords = () => {
    const table = document.querySelector("table");
    const data = JSON.parse(localStorage.getItem("passwords"));

    if (data === null || data.length === 0) {
        table.innerHTML = "<tr><th>No data to show</th></tr>";
    } else {
        table.innerHTML = `
            <tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>`;

        for (const element of data) {
            table.innerHTML += `
                <tr>
                    <td>${element.website}<img onclick="copyText(${element.website})" src="./copy.svg" alt="Copy Button" width="25" height="25"></td>
                    <td>${element.username}<img onclick="copyText(${element.username})" src="./copy.svg" alt="Copy Button" width="25" height="25"></td>
                    <td>${maskPassword(element.password)}<img onclick="copyText(${element.password})" src="./copy.svg" alt="Copy Button" width="25" height="25"></td>
                    <td><button class="delete-button" data-website="${element.website}">Delete</button></td>
                </tr>`;
        }
    }

    // Add event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const websiteToDelete = button.getAttribute("data-website");
            deletePassword(websiteToDelete);
        });
    });
};

const deletePassword = (websiteToDelete) => {
    let passwords = JSON.parse(localStorage.getItem("passwords"));

    if (passwords === null) {
        return;
    }

    // Filter out the password with the specified website
    passwords = passwords.filter((element) => element.website !== websiteToDelete);

    // Update the localStorage and refresh the table
    localStorage.setItem("passwords", JSON.stringify(passwords));
    showPasswords();
};

console.log("working");
showPasswords();

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Clicked...");

    // Get website, username, and password from the form
    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log(website, username, password);
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

    passwords.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(passwords));
    alert("Password Saved");

    // Clear form fields
    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    showPasswords();
});

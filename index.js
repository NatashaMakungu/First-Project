document.addEventListener("DOMContentLoaded", function() {
    // Function to display pop up message
    function displayMessage(message) {
        alert(message);
    }

    // Event listener for mouseover on the header
    document.querySelector("header").addEventListener("mouseover", function(event) {
        console.log("Mouse over header");
        displayMessage("Mouse over header!");
    });

    const baseURL = "http://localhost:3000"

    // Get data from server
    function getHotels() {
        fetch(`${baseURL}/hotels`)
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw new error ("Failed to fetch!")
            }
        })
        .then (data => {
            data.map((hotel)=> {
                addHotel(hotel)
            })
        })
    }
    getHotels()

    function addHotel(hotel) {
        let listHotel = document.querySelector("#hotel-list")
        console.log(listHotel)
        let card = document.createElement("li")
        card.className = "card col-5 m-4"
        card.innerHTML = `
        <img src="${hotel.image}" class="card-img-top" alt="${hotel.name}">
        <div class="card-body">
          <h5 class="card-title">${hotel.name}</h5>
          <p class="card-text">${hotel.description}<br>${hotel.location}<br>${hotel.phoneNumber}<br><span style="font-weight: bold">USD: ${hotel.price}</span></p>
          <button style="background-color: #40E0D0" class="book-button btn btn-primary" data-hotel-id="${hotel.id}">Book</button>
        </div>`
        listHotel.append(card)

         // Event listener for the book button
         card.querySelector(".book-button").addEventListener("click", function (event) {
            event.preventDefault();
            let hotelId = this.getAttribute("data-hotel-id");
            bookHotel(hotelId);
        }); 
    }

    // Function to book a hotel
    function bookHotel(userId, hotelId) {
        let bookingData = {
            userId: userId,
            hotelId: hotelId,
        };

        fetch(`${baseURL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(bookingData),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Failed to book hotel!");
            }
        })
        .then((data) => {
            displayMessage("Hotel booked successfully!");
            console.log("Booking details:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
            displayMessage("Failed to book hotel!");
        });
    }

    // Post Data to the server
    const form = document.querySelector(".m-4")
    console.log(form)

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
        e.preventDefault()
        let formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phoneNumber: e.target.phone.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirm_password.value, 
            hotelName: e.target.hotel_name.value,
            city: e.target.city.value,
        }
        console.log(formData)
        e.target.reset()
        fetch (`${baseURL}/user-info` , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        displayMessage("Form submitted successfully!");
    }

    // Function to fetch and display user information
    function fetchAndDisplayUserInfo() {
        fetch(`${baseURL}/user-info`)
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch user information.");
            }
        })
        .then(data => {
            const userList = document.getElementById("user-list").querySelector("tbody");
            userList.innerHTML = ""; // Clear previous data

            data.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="user-id" style="display: none;">${user.id}</td>
                    <td class="user-name">${user.name}</td>
                    <td class="user-email">${user.email}</td>
                    <td class="user-phone">${user.phoneNumber}</td>
                    <td>
                        <button class="edit-button">Edit</button>
                        <button class="delete-button">Delete</button>
                    </td>
                `;
                userList.appendChild(row);

                // Event listener for delete button
                row.querySelector(".delete-button").addEventListener("click", function(event) {
                    event.preventDefault();
                    const userId = row.querySelector(".user-id").innerText;
                    deleteUser(userId);
                });

                // Event listener for edit button
                row.querySelector(".edit-button").addEventListener("click", function(event) {
                    event.preventDefault();
                    const userId = row.querySelector(".user-id").innerText;
                    const userName = row.querySelector(".user-name").innerText;
                    const userEmail = row.querySelector(".user-email").innerText;
                    const userPhone = row.querySelector(".user-phone").innerText;

                    // Populate form fields with user data for editing
                    document.getElementById("name").value = userName;
                    document.getElementById("email").value = userEmail;
                    document.getElementById("phone").value = userPhone;

                    // Set a custom attribute on the form to store user ID for updating
                    document.querySelector("form").setAttribute("data-user-id", userId);
                    displayMessage("Edit mode activated!");
                });
            });
        })
        .catch(error => {
            console.error("Error fetching user information:", error);
            displayMessage("Error fetching user information.");
        });
    }

    // Function to delete user
    function deleteUser(userId) {
        fetch(`${baseURL}/user-info/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.ok) {
                displayMessage("User deleted successfully!");
                fetchAndDisplayUserInfo(); // Refresh user list
            } else {
                throw new Error("Failed to delete user!");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            displayMessage("Failed to delete user!");
        });
    }
    fetchAndDisplayUserInfo();
});



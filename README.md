# HotelHub Booking App

An app for filling in a hotel booking form, deleting and even editing the form. Viewing details and images of different hotels. It also uses a local API to buildout the frontend for our app, HotelHub.

## Setup
Run this command to get the backend started:
$ json-server --watch db.json

Then, open the `index.html` file on your browser to run the application.

## Deliverables
As a user, I can:

1. See the images received from the server, including its hotel name, hotel description, hotel location and hotel prices when the page loads. These information is gotten from the API endpoint; http://localhost:3000/hotels

2. Fill in a form of personal details such as: name, email, phone number etc. These information is then posted to the API endpoint; http://localhost:3000/user-info. A user is also able edit or delete their information, which is also reflected on the server.

3. To book a selected hotel on the image cards which is reflected to the server API endpoint; http://localhost:3000/bookings
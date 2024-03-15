# Booki App

#### Deployed Site - https://booki-app-harshit.vercel.app/

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)

## About

Assignment Submission for Scaler SDE Intern Full-Stack Assignment - __CAB SYSTEM__

Built the FrontEnd using the **ReactJs** and Backend is built in **NodeJs and Express**. For Database i've used **MongoDB Atlas Service.**

#### Project Despription - 
The site lets you book cabs from one location to another and Calculates the shortest distance between two places using the best possible route which takes the least time and Sends confirmation email on successful booking.

You can choose pick-up and drop locations available with no predefined routes. They are calculated using Dijkstra's Algorithm in Backend.

The site gives you the sumary of the trip with estimated cost and Estimated time at which you'll reach destination.
To calculate the Cost for trip, the fare of cab per minute is multiplied with the shortest time it will take to reach from pickup to drop location.

**Dijkstra's Algorithm** for calculating shortest path between two nodes of a graph -
REFER to the file **./BackEND/functions/findShortestPath.js**

## Features

- Create New Booking.
- Show All bookings.
- Delete a booking.
- Sort All bookings on the basis of Date.
- A cab cannot be booked more than once for same time.
- Shortest Possible path which takes the least time to reach the destination.

## Installation

Clone the repo and run the Commands given below to Setup and get the Site working.

```bash
# Example installation commands
cd backEnd 
npm install
node index.js
cd ../FRONTEND
npm install
npm run dev

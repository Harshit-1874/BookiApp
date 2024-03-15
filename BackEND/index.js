import express from "express";
import {connectDb} from "./DB/dbConnect.js";
const app = express();
import { main, getRates,setRate } from "./functions/functionsHere.js";
import bodyParser from 'body-parser';
import {findShortestPath} from "./functions/findShortestPath.mjs";
import {booki} from "./DB/bookingSchema.js";
import cors from "cors";
import {mailSender} from "./tester.js";


app.use(bodyParser.json());
connectDb();

app.use(cors());

app.get('/', (req, res) => {
  console.log("Connection Request");
})

app.get('/rateList',async (req,res)=>{
  res.json(await getRates());
})

app.post('/getavailablecabs', async (req, res) => {
  try {
    const { date, time } = req.body;
    const bookingsForDate = await booki.findOne({ date });

    if (!bookingsForDate) {
      console.log("Fetched cabs");
      res.status(200).json({ availableCabs: ["P", "Q", "R", "S", "T"] });
    } else {
      const CabsBooked = bookingsForDate.bookings.filter(booking => {
        return booking.startTime <= time && booking.endTime >= time;
      }).map(booking => booking.cabName);

      if (CabsBooked.length != 0) {
        const availableCabs = ["P", "Q", "R", "S", "T"].filter(cab => !CabsBooked.includes(cab));
        console.log("Fetched cabs");
        res.status(200).json({ availableCabs });
      } else {
        console.log("Fetched cabs");
        res.status(200).json({ availableCabs: ["P", "Q", "R", "S", "T"] });
      }
    }
  } catch (error) {
    console.error('Error getting available cabs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/deleteEntry', async (req, res) => {
  try {
    const { date, email, startTime } = req.body;

    // Find the booking with the given date, email, and startTime
    const bookingToDelete = await booki.findOneAndUpdate(
      { date, 'bookings.email': email, 'bookings.startTime': startTime },
      { $pull: { bookings: { email, startTime } } },
      { new: true }
    );

    if (!bookingToDelete) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/editCab", async(req,res)=>{
  try{
  const {cab,rate} = req.body;
  await setRate(cab, rate);
  res.sendStatus(201);
  }catch(e){
    res.json(e);
  }
})


app.post('/getShortestDistance', async (req, res) => {
  const { source, destination, time } = req.body;
  const graph = await main();

  const { path, distance } = findShortestPath(graph, source, destination);
  res.json({ path, distance });
});

app.post("/addbooking", async (req, res) => {
  try {
    const { date, email, source, destination, startTime, endTime, cabName, cost } = req.body;

    const existingBooking = await booki.findOne({ date });
    if (existingBooking) {
      existingBooking.bookings.push({ email, source, destination, startTime, endTime, cabName, cost });
      await existingBooking.save();
      mailSender(email,source,destination,startTime,cabName,date);
      res.status(200).json({ message: 'Booking added to existing date' });
    } else {
      const newBooking = new booki({ date, bookings: [{ email, source, destination, startTime, endTime, cabName, cost }] });
      await newBooking.save();
      mailSender(email,source,destination,startTime,cabName,date);
      //console.log('New date and booking created');
      res.status(200).json({ message: 'New date and booking created' });
    }
  } catch (error) {
    console.error('Error adding booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getbookings', async (req, res) => {
  try {
    const bookings = await booki.find({});
    console.log("Fetched data successfully");
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/getRates", async (req, res) => {
  try {
    const rates = await getRates();
    const { availableCabs, distance } = req.body;
    const prices = {};
    availableCabs.forEach(cab => {
      if (rates.hasOwnProperty(cab)) {
        prices[cab] = rates[cab] * distance;
      }
    });
    res.send(prices);
  } catch (err) {
    console.log(err);
  }
});

app.listen(8000, () => {
  console.log("server listening at port 8000");
})
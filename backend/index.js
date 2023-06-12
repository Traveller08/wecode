import express from "express" 
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());
import login from './Routes/login.js';
import register from './Routes/register.js';
import profile from './Routes/profile.js';
import historicalData from './Routes/historical_data.js';
import portfolioHoldings from './Routes/holdings.js';
import placeOrder from './Routes/place_order.js';
import symbols from './Routes/symbols.js';
/*
routes 
/user/login
/user/register

/user/profile
/historical-data
/portfolio/holdings
/order/place_order
*/
app.use('/user/login', login);
app.use('/user/register',register);
app.use('/user/profile',profile);
app.use('/historical-data',historicalData);
app.use('/portfolio/holdings',portfolioHoldings);
app.use('/order/place_order',placeOrder);
app.use('/symbols',symbols);


app.listen(5000,()=>{
    console.log("server started on port 5000");
})



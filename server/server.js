import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/Webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudnary from './config/cloudnary.js'

// Initialize Express
const app = express()

// connect to database
await connectDB()
await connectCloudnary()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/',(req,res)=> res.send("API working"))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks',clerkWebhooks)
app.use('/api/company',companyRoutes)

// Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=> {
    console.log(`Server is Running on PORT: ${PORT}`);
})
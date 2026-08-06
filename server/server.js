import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import * as Sentry from "@sentry/node";
import { clerkMiddleware } from '@clerk/express'

import connectDB from './config/db.js'
import connectCloudnary from './config/cloudnary.js'

import { clerkWebhooks } from './controllers/Webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'

// Initialize Express
const app = express()

// Connect Database & Cloudinary
await connectDB()
await connectCloudnary()

// Middlewares
app.use(cors())

// Clerk Webhook Route (Keep this BEFORE express.json())
app.post('/webhooks', express.raw({ type: 'application/json' }), clerkWebhooks)

// Parse JSON for all other routes
app.use(express.json())

// Clerk Authentication Middleware
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => {
    res.send("API working")
})

app.get("/debug-sentry", (req, res) => {
    throw new Error("My first Sentry error!");
})

app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

// Sentry Error Handler
Sentry.setupExpressErrorHandler(app)

// Start Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`);
})
import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer";
import connectDB from "./config/db.js";
import dns from 'dns';
import authRouter from "./routes/authRoute.js";
import employeesRouter from "./routes/employeeRoute.js";
import profileRouter from "./routes/profileRoute.js";
import attendanceRouter from "./routes/attendanceRoute.js";
import leaveRouter from "./routes/leaveRouter.js";
import payslipRouter from "./routes/payslipsRoute.js";
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors())
app.use(express.json());
app.use(multer().none())

// Route 
app.get("/", (req, res)=> res.send("server running"))
app.use("/api/auth", authRouter)
app.use("/api/employee", employeesRouter)
app.use('/api/profile', profileRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/payslip', payslipRouter)

await connectDB()
app.listen(port, ()=> console.log(`server running on port ${port}`))
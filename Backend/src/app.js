import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static('public'))
app.use(cookieParser())

// Root route
app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Server is running",
        endpoints: {
            register: "/api/v1/users/register",
            login: "/api/v1/users/login",
            logout: "/api/v1/users/logout",
            dashboard: "/api/v1/dashboard",
             // Added dashboard endpoint
        }
    });
});

//rout import
import userRouter from '../src/routes/user.rout.js' 
import dashboardRouter from "./routes/dashboard.route.js"; // Import dashboard router
import menuOptimizationRoutes from './routes/MenuOptimization.routes.js'; // Import MenuOptimization routes

//rout decalare
app.use("/api/v1/users", userRouter)
app.use("/api/v1/dashboard", dashboardRouter); // Declare dashboard route
app.use("/api/v1/menu", menuOptimizationRoutes); // Declare MenuOptimization route

export default app; // Changed named export to default export
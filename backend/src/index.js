import express from "express";

const app = express();

app.use("/api/auth" , authRoutes)

app.listen(5001, () => {
    console.log("server running in port 5001")
})
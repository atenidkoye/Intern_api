import express from "express";
import candidates from "./Candidates"
import applications from "./Applications"
import summary from "./Summary"
import positions from "./Positions"
import auth from "./auth";

const app = express();

app.use(express.json());


app.use("/api/candidates", candidates)
app.use("/api/applications", applications)
app.use("/api/summary", summary)
app.use("/api/positions", positions)
app.use("/api/auth", auth)

export default app;
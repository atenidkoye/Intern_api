import express from "express";
import candidates from "./Candidates"
import applications from "./Applications"
import summary from "./Summary"
import positions from "./Positions"

const app = express();

app.use(express.json());


app.use("/api/candidates", candidates)
app.use("/api/applications", applications)
app.use("/api/summary", summary)
app.use("api/positions", positions)

export default app;
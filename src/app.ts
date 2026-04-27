import express from "express";
import candidateRoutes from "./Candidates/routes/candidate.routes";
import applicationRoutes from "./Applications/routes/application.routes";
import summaryRoutes from "./Summary/routes/summary.routes";
import candidates from "./Candidates"
import applications from "./Applications"

const app = express();

app.use(express.json());

app.use("/api/candidates", candidateRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/candidates", candidates)
app.use("/api/applications", applications)


export default app;
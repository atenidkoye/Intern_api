import express from "express";
import candidateRoutes from "./routes/candidate.routes";
import applicationRoutes from "./routes/application.routes";
import summaryRoutes from "./routes/summary.routes";

const app = express();

app.use(express.json());

app.use("/api/candidates", candidateRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/summary", summaryRoutes);

export default app;
import { Request, Response, Router } from "express";
import path from "path";
// Routes
const router = Router();
const routers = Router();
//
routers.use("/api/v1", router);
// Router not found
routers.all("*", (req: Request, res: any) => {
  return res.sendFile(path.join(__dirname, "build", "index.html"));
  return res.status(404).json({
    success: false,
    message: "404",
  });
});

export default routers;

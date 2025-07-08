import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/test', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Auth route is working!',
    timestamp: new Date().toISOString()
  });
});

export default router;

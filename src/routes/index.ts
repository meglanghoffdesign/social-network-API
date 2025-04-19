import { Router } from 'express';
import apiRoutes from './api/index.js'; // './api/index.ts' is implied
const router = Router();

// Combine all your API routes under '/'
router.use('/', apiRoutes);

export default router;
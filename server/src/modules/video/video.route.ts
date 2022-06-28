import requireUser from '@middleware/requireUser';
import express from 'express';
import { findVideosHandler, streamVideoHandler, updateVideoHandler, uploadVideoHandler } from './video.controller';
const router = express.Router();

router.post('/', requireUser, uploadVideoHandler);

router.patch("/:videoId", requireUser, updateVideoHandler);

router.get("/:videoId", streamVideoHandler);

router.get('/', findVideosHandler);

export default router;
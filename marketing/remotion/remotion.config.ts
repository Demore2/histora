import { Config } from '@remotion/cli/config';

// 1080x1920 @ 30 fps; H.264 + AAC, zelfde eindformaat als de oude ffmpeg-montage.
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setCodec('h264');
Config.setCrf(18);
Config.setOverwriteOutput(true);
Config.setPublicDir('public');

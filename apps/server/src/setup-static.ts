import { join } from 'path';
import { INestApplication } from '@nestjs/common';
import {
  static as serverStatic,
  NextFunction,
  Request,
  Response,
} from 'express';

function fallthroughPaths() {
  const serverRoutes = ['login', 'login/callback', 'user', 'proxy', 'logout'];
  return new RegExp('^/(?!' + serverRoutes.join('|') + ').*');
}

export function setupStatic(app: INestApplication) {
  const appFolder = join(__dirname, '../..', 'client/dist/client');
  app.use(
    isAuthenticated,
    serverStatic(appFolder, { fallthrough: true }),
    (req, res) => {
      res.header(
        'Cache-Control',
        'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
      );
      res.header('Access-Control-Allow-Origin', '*');
      res.sendFile('index.html', { root: appFolder });
    }
  );
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as any).isAuthenticated()) {
    return next();
  } else if (
    req.path === '/login' ||
    req.path === '/login/callback' ||
    req.path === '/logout'
  ) {
    return next();
  }
  res.redirect('/login');
};

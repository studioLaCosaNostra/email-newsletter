import * as request from 'request-promise';
import * as mkdirp from 'mkdirp';
import { promisify } from 'util';
import { writeFileSync } from 'fs';
import { Express } from 'express';

import { app } from './express-app';
import { ROUTES } from './routes.static';

const mkdirpAsync = promisify(mkdirp);

function prerender(expressApp: Express, routes: string[]) {
  const PORT = process.env.PRERENDER_PORT || 4000;
  // Start up the Node server
  const server = expressApp.listen(PORT, async () => {
    try {
      for (const route of routes) {
        const result = await request.get(`http://localhost:${PORT}${route}`);
        await mkdirpAsync(`dist/browser${route}`);
        writeFileSync(`dist/browser${route}/index.html`, result);
      }
      console.log('Prerender complete.');
      server.close();
    } catch (error) {
      server.close(() => process.exit(1));
    }
  });
}

prerender(app, ROUTES);

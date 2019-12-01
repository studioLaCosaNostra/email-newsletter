import { app } from './express-app';

const PORT = process.env.PORT || 4000;

// Start up the Node server
app.listen(PORT, async () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});

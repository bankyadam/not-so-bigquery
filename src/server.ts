import http from 'http';
import app from './application';

export default function(port: number, hostname: string) {
  const server = http.createServer(app);
  server.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}`);
  });
}

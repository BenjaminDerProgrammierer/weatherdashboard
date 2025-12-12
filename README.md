# Weather Dashboard

A sleek and modern weather dashboard application built with Next.js.

## How to Run

### Development Mode

1. Add a `.env` file with your `API_KEY` for weather.com (`e1f10a1e78da46f5b10a1e78da96f525` is one that is publicly available)
2. Install dependencies: `npm ci`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Mode

#### Using Node.js

1. Build the application: `npm run build`
2. Start the production server: `npm start`

#### Using Docker

The application is dockerized using Next.js standalone mode with node:20-alpine (LTS).

**Using Docker Compose:**
```bash
docker-compose up --build
```

**Using Docker directly:**
```bash
# Build the image
docker build -t weatherdashboard .

# Run the container
docker run -p 3000:3000 --env-file .env weatherdashboard
```

**Using pre-built images from GitHub Container Registry:**
```bash
docker pull ghcr.io/benjaminderprogrammierer/weatherdashboard:latest
docker run -p 3000:3000 --env-file .env ghcr.io/benjaminderprogrammierer/weatherdashboard:latest
```

You'll need to provide your `.env` file with the `API_KEY` environment variable for all deployment methods.

# Raj Mind Health Services (v2)

This is the upgraded version of the Raj Mind Health Services platform, built with **Next.js 16**, **Tailwind CSS v4**, and **Lucide React**.

## Features

- **Responsive Design**: Modern UI optimized for mobile and desktop.
- **Improved Navigation**: Clear structure for services and information.
- **Agent Optimized**: Schema.org JSON-LD structured data for better AI discoverability.
- **Docker Support**: Containerized for easy deployment.

## Prerequisites

- **Node.js**: v20.9.0 or higher (for local development).
- **Docker**: For containerized deployment.

## Getting Started

### Local Development

1.  Navigate to the `v2` directory:
    ```bash
    cd v2
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

### Docker

You can build and run the application using Docker and Docker Compose. The `docker-compose.yml` file is located in the root directory.

1.  **Build and Run**:
    From the root of the repository:

    ```bash
    docker compose up -d --build
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

2.  **Stop**:
    ```bash
    docker compose down
    ```

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `public/`: Static assets (images, fonts).
- `components/`: Reusable React components (Navbar, Footer, etc.).
- `Dockerfile`: Docker configuration for production builds.

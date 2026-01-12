# Raj Mind Health Services (v2) - Modern Platform

This directory contains the **Phase 1 (Foundation & Information)** implementation of the Raj Mind Health Services platform. It is the active, modern version of the application, built with:

-   **Framework**: Next.js 16 (App Router)
-   **Styling**: Tailwind CSS v4
-   **Icons**: Lucide React
-   **Agent Optimization**: Schema.org JSON-LD structured data

For the full project roadmap and future plans (Authentication, Bookings, Payments), please refer to the root [`UPGRADE_PLAN.md`](../UPGRADE_PLAN.md).

## Features

-   **Responsive Design**: Modern UI optimized for mobile and desktop.
-   **Improved Navigation**: Clear structure for services and information.
-   **Agent Optimized**: Schema.org JSON-LD structured data for better AI discoverability.
-   **Docker Support**: Containerized for easy deployment (see root `docker-compose.yml`).

## Prerequisites

-   **Node.js**: v20.9.0 or higher (for local development).
-   **Docker**: For containerized deployment.

## Getting Started

### Local Development

1.  Navigate to the `v2` directory (if you haven't already):
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

The `docker-compose.yml` file is located in the **root directory** of this repository, which uses the `Dockerfile` present in this directory.

To run with Docker, navigate to the **root** of the repository and run:

```bash
docker compose up -d --build
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

-   `app/`: Next.js App Router pages and layouts.
-   `public/`: Static assets (images, fonts).
-   `components/`: Reusable React components (Navbar, Footer, etc.).
-   `Dockerfile`: Docker configuration for production builds.

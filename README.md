# Raj Mind Health Services (MHS) Platform

Welcome to the **Raj Mind Health Services** repository. This project serves as a comprehensive platform for mind health professionals to showcase services, organize schedules, and manage bookings.

## Project Goal
The primary objective of this project is to upgrade the legacy static website into a dynamic, "Agent First" platform. This architecture is designed to allow AI Agents to interact seamlessly with the system, enabling them to schedule appointments and manage services on behalf of users.

## Project Status: Phase 1 Completed
**Phase 1: Foundation & Information** has been successfully completed.
-   **Modern Tech Stack**: Transitioned from static HTML to **Next.js 16**, **Tailwind CSS v4**, and **Lucide React**.
-   **Agent Optimization**: Implemented Schema.org JSON-LD structured data across core pages for enhanced AI discoverability.
-   **DevOps Ready**: Fully containerized using Docker and Docker Compose.

See [`UPGRADE_PLAN.md`](./UPGRADE_PLAN.md) for the detailed roadmap and future phases (Authentication, Booking System, Payments).

## Documentation
-   [`UPGRADE_PLAN.md`](./UPGRADE_PLAN.md): Detailed roadmap and feature breakdown.
-   [`FLOW.md`](./FLOW.md): Application navigation flow and structure.
-   [`BRAND_GUIDELINES.md`](./BRAND_GUIDELINES.md): Color palette, typography, and visual strategy.

## Repository Structure
This repository contains two versions of the application:

1.  **Current Version (v2)**: Located in the [`v2/`](./v2) directory. This is the active, modern application.
2.  **Legacy Version**: Located in the [`legacy/`](./legacy) directory. This is the archived static HTML/CSS site.

## Getting Started

### Quick Start (Docker)
The easiest way to run the application is using Docker Compose from the root directory.

1.  **Build and Run**:
    ```bash
    docker compose up -d --build
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

2.  **Stop**:
    ```bash
    docker compose down
    ```

### Development (v2)
For local development and contributing to the modern platform:
1.  Navigate to the `v2/` directory.
2.  Follow the detailed setup instructions in [`v2/README.md`](./v2/README.md).

### Legacy Site
To view the legacy static site:
1.  Navigate to `legacy/`.
2.  Run `python3 -m http.server`.
3.  Open `http://localhost:8000`.

# Upgrade Plan for Raj Mind Health Services

## Goal
Upgrade the current static website to a dynamic platform for mind health professionals to showcase services, organize schedules, and manage bookings.
**Key Objective:** Transform the platform into an **"Agent First"** system, allowing AI Agents to interact with the platform seamlessly to schedule appointments and manage services on behalf of users.

## Proposed Tech Stack

### Frontend
- **Framework**: Next.js 16 (React)
- **Styling**: Tailwind CSS v4
- **State Management**: React Context / Hooks
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js (Next.js API Routes / Server Actions)
- **Database**: PostgreSQL (Future Phase)
- **Authentication**: Auth.js (Future Phase)
- **API Standards**: OpenAPI (Swagger) v3.1+ for high-quality agent consumption.

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Hosting**: Vercel/Netlify (Frontend), Railway/Heroku/AWS (Backend).
- **CI/CD**: GitHub Actions.

## Features Breakdown

### Phase 1: Foundation & Information (Completed)
- [x] Migrate current static content to new framework (Next.js).
- [x] Modern UI/UX design (Responsive, Accessible) using Tailwind CSS.
- [x] Implement core pages: Home, About Us, Services, Contact Us, Gallery, Testimonials.
- [x] **Agent Optimization**: Implement Schema.org structured data across all pages.
- [x] **DevOps**: Add Docker support for containerized deployment.

### Phase 2: User System & Bookings (Agent Ready)
- [ ] **User Authentication**: Login/Signup for Patients and Professionals.
- [ ] **Professional Profile**: Dashboard for professionals to manage availability.
- [ ] **Booking System**:
    -   Calendar view for availability.
    -   Slot selection for patients.
    -   Appointment management (Reschedule/Cancel).
- [ ] **Agent API**: Expose well-documented endpoints for checking availability and creating bookings.

### Phase 3: Payments & Notifications
- [ ] **Payment Gateway**: Integration with Stripe/Razorpay.
- [ ] **Notifications**: Email/SMS reminders for appointments (Twilio/SendGrid).
- [ ] **Refunds**: Automated or manual refund handling for cancellations.

### Phase 4: Polish & Launch
- [ ] **Testing**: Unit and Integration tests.
- [ ] **SEO Optimization**.
- [ ] **Security Audit**.
- [ ] **Agent Testing**: Verify that popular AI agents (e.g., via LangChain tools) can successfully navigate the booking flow.

## Next Steps
1.  Complete documentation updates (README.md).
2.  Begin planning Phase 2 (Database schema & Authentication).

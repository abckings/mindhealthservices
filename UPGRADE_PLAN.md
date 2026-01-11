# Upgrade Plan for Raj Mind Health Services

## Goal
Upgrade the current static website to a dynamic platform for mind health professionals to showcase services, organize schedules, and manage bookings.
**Key Objective:** Transform the platform into an **"Agent First"** system, allowing AI Agents to interact with the platform seamlessly to schedule appointments and manage services on behalf of users.

## Proposed Tech Stack

### Frontend
- **Framework**: React.js or Next.js (for SEO and performance).
- **Styling**: Tailwind CSS.
- **State Management**: Redux or Context API.

### Backend
- **Runtime**: Node.js (Express.js) or Python (Django/FastAPI).
- **Database**: PostgreSQL (for structured data like bookings/payments) or MongoDB.
- **Authentication**: JWT (JSON Web Tokens) or Auth0/Firebase Auth.
- **API Standards**: OpenAPI (Swagger) v3.1+ for high-quality agent consumption.

### Infrastructure
- **Hosting**: Vercel/Netlify (Frontend), Railway/Heroku/AWS (Backend).
- **CI/CD**: GitHub Actions.

## Features Breakdown

### Phase 1: Foundation & Information (Current Parity +)
- [x] Migrate current static content to new framework (Next.js 16).
- [x] Modern UI/UX design (Responsive, Accessible) using Tailwind CSS.
- [ ] "About Us" and "Services" pages with CMS integration (optional, e.g., Strapi/Contentful) for easy updates.
- [x] **Agent Optimization**: Implement Schema.org structured data across all pages.
- [x] Create missing team pages (`Board of Trustees`, `Advisory Board`, `Technical Support Team`).
- [x] Refine Schema.org data for individual Service pages.

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
1.  Verify static build and deployment capability.
2.  Begin Phase 2: Set up User Authentication (NextAuth.js / Auth0) and Database (PostgreSQL).
3.  Design and implement the Professional Dashboard.

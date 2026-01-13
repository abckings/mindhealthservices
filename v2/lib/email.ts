export const emailService = {
    sendAppointmentConfirmation: async (to: string, details: any) => {
        console.log(`[Email Service] Sending confirmation to ${to}`, details);
        return { success: true, id: "email_mock_id" };
    },
    sendReminder: async (to: string, details: any) => {
        console.log(`[Email Service] Sending reminder to ${to}`, details);
        return { success: true, id: "email_mock_id" };
    }
};

// Mock implementation of Stripe
export const stripe = {
    paymentIntents: {
        create: async (params: { amount: number; currency: string }) => {
            console.log("Mock Stripe Create PaymentIntent:", params);
            return {
                id: `pi_mock_${Math.random().toString(36).substr(2, 9)}`,
                client_secret: `pi_mock_secret_${Math.random().toString(36).substr(2, 9)}`,
                amount: params.amount,
                currency: params.currency,
                status: "requires_payment_method"
            };
        },
        retrieve: async (id: string) => {
             console.log("Mock Stripe Retrieve PaymentIntent:", id);
             return {
                 id,
                 status: "succeeded",
                 amount_received: 1000 // Mock
             };
        }
    }
};

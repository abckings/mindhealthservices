// Mock implementation of Razorpay
export const razorpay = {
    orders: {
        create: async (params: { amount: number; currency: string }) => {
            console.log("Mock Razorpay Create Order:", params);
            return {
                id: `order_mock_${Math.random().toString(36).substr(2, 9)}`,
                entity: "order",
                amount: params.amount,
                amount_paid: 0,
                amount_due: params.amount,
                currency: params.currency,
                receipt: `rcpt_${Math.random().toString(36).substr(2, 9)}`,
                status: "created",
                attempts: 0,
                notes: [],
                created_at: Math.floor(Date.now() / 1000)
            };
        },
        fetch: async (id: string) => {
             console.log("Mock Razorpay Fetch Order:", id);
             return {
                 id,
                 entity: "order",
                 amount: 1000,
                 currency: "INR",
                 status: "paid"
             };
        }
    }
};

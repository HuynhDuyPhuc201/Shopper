export const useCheckout = (subTotal, valuePromotion) => {
    const tax = subTotal * 0.1;
    const promotionCode = subTotal * valuePromotion || 0;
    const total = subTotal + tax;

    return {
        tax,
        promotionCode,
        total,
    };
};

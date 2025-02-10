const ShoppingCart = require("./cart");

test("Adding products updates cart correctly", async () => {
    const cart = new ShoppingCart();

    await cart.addProduct("cornflakes", 2);
    await cart.addProduct("weetabix", 1);

    const totals = cart.calculateTotals();

    expect(cart.cart.cornflakes.quantity).toBe(2);
    expect(cart.cart.weetabix.quantity).toBe(1);
    expect(totals.subtotal).toBeCloseTo(15.02, 2);
    expect(totals.tax).toBeCloseTo(1.88, 2);
    expect(totals.total).toBeCloseTo(16.90, 2);
});

test("Subtotal, tax, and total calculations are correct", () => {
    const cart = new ShoppingCart();
    cart.cart = {
        cornflakes: { quantity: 2, price: 2.52 },
        weetabix: { quantity: 1, price: 9.98 }
    };

    const totals = cart.calculateTotals();

    expect(totals.subtotal).toBeCloseTo(15.02, 2);
    expect(totals.tax).toBeCloseTo(1.88, 2);
    expect(totals.total).toBeCloseTo(16.90, 2);
});

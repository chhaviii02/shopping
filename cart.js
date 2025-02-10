const fetch = require("node-fetch");

class ShoppingCart {
    constructor() {
        this.cart = {}; // Stores { productName: { quantity, price } }
    }

    async addProduct(productName, quantity) {
        if (quantity <= 0) {
            console.log("❌ Quantity must be greater than 0.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3001/products/${productName}`);
    
            if (!response.ok) {
                throw new Error(`❌ Product "${productName}" not found.`);
            }
    
            const product = await response.json();
    
            if (!product.price) {
                throw new Error(`❌ No price available for "${productName}".`);
            }
    
            if (!this.cart[productName]) {
                this.cart[productName] = { quantity: 0, price: product.price };
            }
            this.cart[productName].quantity += quantity;
    
            console.log(`✅ Added ${quantity} x ${product.title} to the cart.`);
        } catch (error) {
            console.error(error.message);
        }
    }
    

    calculateTotals() {
        let subtotal = 0;

        for (const product of Object.values(this.cart)) {
            subtotal += product.quantity * product.price;
        }

        const tax = parseFloat((subtotal * 0.125).toFixed(2));
        const total = parseFloat((subtotal + tax).toFixed(2));

        return { subtotal, tax, total };
    }

    displayCart() {
        console.log("\nCart Contents:");
        for (const [name, product] of Object.entries(this.cart)) {
            console.log(`${product.quantity} x ${name} @ ${product.price} each`);
        }

        const totals = this.calculateTotals();
        console.log(`Subtotal: $${totals.subtotal}`);
        console.log(`Tax (12.5%): $${totals.tax}`);
        console.log(`Total Payable: $${totals.total}\n`);
    }
}

module.exports = ShoppingCart;

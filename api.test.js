const request = require("supertest");
const app = require("./index"); // ✅ Use the correct relative path

describe("🛠️ API Testing for Product Prices", () => {
    test("✅ Should fetch all products", async () => {
        const response = await request(app).get("/products"); // ✅ Pass `app` instead of URL
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("cornflakes");
        expect(response.body).toHaveProperty("weetabix");
    });

    test("✅ Should fetch a single product price", async () => {
        const response = await request(app).get("/products/cornflakes"); // ✅ Pass `app`
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("price");
        expect(typeof response.body.price).toBe("number");
    });

    test("❌ Should return 404 for unknown product", async () => {
        const response = await request(app).get("/products/unknown");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Product not found" });
    });
});

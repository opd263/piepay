# PiePay Backend Service

## 1. Setup

1. **Clone the repository**
   git clone https://github.com/opd263/piepay.git
   cd piepay
   npm install
   npm run dev
2. **Install dependencies**
   npm install
3. **Configure database**
   - Uses SQLite by default. No manual migrations are required.
   - A `database.sqlite` file will be created automatically in the project root.
4. **Run the development server**
   npm run dev
5. **Build & start (production)**
   npm run build
   npm start

The backend will be available at `http://localhost:3000`.

## 2. Assumptions

Offers are located at offer_sections.PBO.offers in Flipkart's JSON.
Each offer has a unique adjustment_id, summary, and optional contributors fields.
Discounts are extracted from the summary using regex for ₹-based flat values (not %).
SQLite is used for quick prototyping and local development.
## 3. Design Choices

- **Framework:** Express.js + TypeScript for fast, type-safe development.
- **ORM:** TypeORM provides decorators and seamless entity mapping (no SQL boilerplate).
- **Database:** SQLite simplifies setup (file-based), auto-syncs schema via `synchronize: true`.
- **Layering:** Clear separation of routes, controllers, services, and models for maintainability.
- **Scalability:** Using simple-array columns and indexed fields for quick lookups by bank/instrument.

## 4. Scaling `/highest-discount` to 1,000 RPS

- **Connection Pooling:** Ensure TypeORM’s pool is sized appropriately for concurrent queries.
- **Caching:** Layer a Redis cache indexed by `bankName`+`paymentInstrument` to serve repeated requests in-memory.
- **Load Balancing:** Run multiple Node.js instances behind a load balancer (e.g., NGINX or AWS ALB).
- **Pre-computation:** Pre-compute and store “best discount” per bank and instrument periodically in a fast-access table.
- **Asynchronous I/O:** Leverage Node’s event loop and non-blocking DB drivers.

## 5. Future Improvements

- **Comprehensive Offer Parsing:** Handle percentage-based discounts, caps, and nested conditions.
- **Validation:** Add `class-validator` to enforce request schemas and payload shapes.
- **Error Handling & Logging:** Centralize error middleware and structured logs (e.g., Winston).
- **Testing:** Add unit and integration tests (Jest + Supertest).
- **API Documentation:** Integrate Swagger/OpenAPI for interactive docs.
- **Dockerization:** Provide a Dockerfile and compose setup for containerized deployment.
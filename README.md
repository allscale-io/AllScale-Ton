# AllScale

AllScale is a platform designed to make stablecoin-based financial tools accessible, intuitive, and compliant for small businesses and individuals. Our mission is to create a world where any business, anywhere, can access fast, reliable, and low-cost financial tools—empowering teams and individuals with financial freedom and global reach.

## What We Offer

- **Payroll:** Automate cross-border payroll in stablecoins—simplify contractor payments, eliminate costly intermediaries, and ensure instant global delivery.
- **Invoicing:** Create, e-sign, and send professional contracts and invoices in seconds. Get paid by clients in their preferred method and instantly receive stablecoin—maximizing liquidity, minimizing friction.
- **Social Commerce:** Transform your followers into customers and do business in any messaging app. Embed a dynamic AllScale biolink on your social profiles, showcase your offerings, and securely collect instant stablecoin payments.

AllScale is built to be intuitive, fast, and no-code-friendly, so you can focus on growing your business. We believe in financial inclusion, global workforce empowerment, and cost-efficient, scalable solutions for everyone—from solo entrepreneurs to global organizations.

For more information, visit the [AllScale Knowledge Base](https://docs.allscale.io/).

# AllScale TON Telegram Mini App

A hackathon-ready demo for AllScale's invoicing and social commerce on TON, built as a Telegram Mini App.

## Project Structure

- `web/` — React frontend for Telegram Mini App
- `contracts/` — Tact smart contracts for TON
- `server/` — Node.js/Express backend for product/invoice metadata

## Features (MVP)
- Product listing (from backend)
- Invoice creation (backend + on-chain demo)
- Payment via TON (on-chain, with backend update)
- Minimal, clean UI (Telegram Mini App style)

---

## Getting Started

### 1. **Start the Backend (Express Server)**

```
cd server
node index.js
```
- Runs on [http://localhost:4000](http://localhost:4000)
- Endpoints: `/products`, `/invoices`, `/invoices/:id/pay`

### 2. **Start the Frontend (Telegram Mini App)**

```
cd web
npm install
npm run dev
```
- Runs on [http://localhost:5173](http://localhost:5173)
- Connect your TON wallet using the button in the header.
- For Telegram Mini App: Use [ngrok](https://ngrok.com/) or similar to expose your local server, then set the URL in your Telegram bot settings.

### 3. **Smart Contracts**

- See `contracts/InvoiceManager.tact` for the Tact contract.
- Deploy using [Tact CLI](https://docs.tact-lang.org/docs/cli/overview).
- Update the contract address in `web/src/utils/ton-contract.ts` for real integration.

### 4. **Telegram Mini App Setup**

1. Create a Telegram bot with [@BotFather](https://t.me/BotFather).
2. In BotFather, set the bot's domain to your deployed frontend (use ngrok for local dev).
3. Add the bot to a chat and open as a Mini App.
4. See [Telegram Mini Apps Guide](https://core.telegram.org/bots/webapps) for details.

**Made for AllScale + TON Hackathon** 
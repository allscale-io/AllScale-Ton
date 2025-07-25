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

---

## Next Steps
- Fill in product/invoice details in the UI.
- Connect frontend to smart contract (update payloads/address as needed).
- Polish UI/UX for demo.

---

**Made for AllScale + TON Hackathon** 
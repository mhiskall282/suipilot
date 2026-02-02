# AI Intent Trading Copilot on Sui

> *Trade with natural language. Execute with precision.*

## 🎯 The Big Idea

AI Intent Trading Copilot reimagines crypto trading by letting users express their trading goals in plain English instead of manually configuring complex order parameters. Say "I want to buy $500 of SUI when it dips below $3.50" and let AI handle the rest—parsing your intent, finding the best execution path on DeepBook, and completing the trade securely.

We're building the future of accessible DeFi trading by combining:
- **Natural Language Processing** for intuitive user experience
- **Sui Intents** for structured, verifiable execution
- **DeepBook** for deep liquidity and efficient price discovery
- **Walrus** for decentralized storage of trading history
- **Seal** for encrypted privacy-preserving user preferences

## 🚀 What We're Building

### Core Features

**🗣️ Natural Language Trading**
- Express trading goals conversationally: "Swap 100 USDC for SUI at market price"
- AI parses and structures your intent automatically
- Review and confirm before execution

**📊 DeepBook Integration**
- Real-time orderbook analysis for optimal execution
- Simulated fills before committing transactions
- Transparent pricing and slippage estimates

**🔐 Privacy-First Design**
- Trading preferences encrypted with Seal
- Only you control access to your trading history
- No sensitive data stored on-chain

**💾 Decentralized Storage**
- Walrus stores encrypted intent history and execution logs
- Content-addressable references for efficient retrieval
- Verifiable execution receipts

## 🏗️ Architecture

```
┌─────────────────┐
│   Web UI        │  User inputs natural language
└────────┬────────┘
         │
┌────────▼────────┐
│ AI Intent       │  Parses text → structured intent
│ Parser          │  { action, assets, amount, constraints }
└────────┬────────┘
         │
┌────────▼────────┐
│ Quote & Routing │  Fetches DeepBook orderbook
│ Engine          │  Generates execution plan + quote
└────────┬────────┘
         │
┌────────▼────────┐
│ DeepBook        │  Executes trade on-chain
│ Executor        │  Returns transaction receipt
└────────┬────────┘
         │
┌────────▼────────┐
│ Walrus Storage  │  Stores encrypted execution logs
│ + Seal Privacy  │  Encrypted user preferences
└─────────────────┘
```

## 🔄 User Flow

1. **Express Intent** → User types: *"Buy 50 SUI with USDC, max slippage 1%"*
2. **AI Processing** → System parses into structured intent format
3. **Orderbook Analysis** → Fetches live DeepBook data
4. **Quote Generation** → Shows expected price, slippage, gas costs
5. **User Confirmation** → Review and approve execution plan
6. **On-Chain Execution** → Transaction submitted to Sui/DeepBook
7. **Receipt & Storage** → Encrypted log saved to Walrus, receipt returned

## 🛠️ Technical Stack

### Sui Ecosystem
- **DeepBook** - On-chain orderbook for liquidity and execution
- **Sui Intents** - Structured intent framework for deterministic execution
- **Walrus** - Decentralized blob storage for trading history
- **Seal** - Encryption layer for user privacy

### Intent Specification
```json
{
  "action": "buy" | "sell" | "swap",
  "sell_asset": "USDC",
  "buy_asset": "SUI",
  "amount": "100",
  "constraints": {
    "max_slippage": "1%",
    "limit_price": "3.50",
    "time_limit": "1h"
  }
}
```

## 🎬 MVP Scope (ETHGlobal Hackathon)

### What We're Shipping
✅ Single trading pair (SUI/USDC)  
✅ Market and aggressive limit orders  
✅ Basic AI natural language parsing  
✅ Wallet-integrated execution flow  
✅ Demo-focused UI with clear intent → execution visualization  
✅ DeepBook integration for live orderbook data  
✅ Walrus storage for execution receipts  
✅ Seal encryption for user preferences  

### Out of Scope (Future Work)
- Multi-intent batching
- Advanced strategies (DCA, grid trading)
- Social/referral trading features
- Solver competition framework

## 🔒 Security & Privacy

**Privacy Model**
- User preferences encrypted client-side with Seal
- Only content hashes stored on-chain
- Users maintain full control over decryption keys

**Execution Safety**
- Deterministic intent parsing (no ambiguity)
- Explicit user confirmation required
- Replay-resistant transaction design
- Simulation before execution

**Data Minimization**
- No PII on-chain
- Walrus stores only encrypted blobs
- Intent history accessible only to user

## 🌟 Why This Matters

**For Users**
- Lower barrier to entry for DeFi trading
- No need to understand order types, slippage, gas optimization
- Natural language makes DeFi accessible to everyone

**For Sui Ecosystem**
- Showcases power of Sui Intents + DeepBook combination
- Demonstrates Walrus utility for real applications
- Highlights Seal's privacy capabilities

**For DeFi**
- Bridges gap between intent and execution
- Sets foundation for AI-powered trading strategies
- Opens door to sophisticated automation for retail users

## 🚀 Future Vision

This MVP is just the beginning. We envision:

- **Multi-Intent Strategies**: "Buy SUI weekly for the next 3 months with $100 each time"
- **Social Trading**: "Copy Alice's strategy but with 50% of her position size"
- **Solver Marketplace**: Competition among execution engines for best prices
- **On-Chain Settlement**: Fully decentralized intent matching and settlement
- **Cross-Chain**: Extend to multi-chain trading with unified intent language

## 🏁 Getting Started

```bash
# Coming soon - setup instructions for running locally
npm install
npm run dev
```

## 📚 Resources

- [Sui Intents Documentation](https://docs.sui.io)
- [DeepBook Protocol](https://deepbook.tech)
- [Walrus Storage](https://walrus.site)
- [Seal Encryption](https://docs.sui.io/concepts/cryptography/transaction-auth/seal)

## 👥 Team

Built for ETHGlobal by @mhiskall282/@georgegoldman/


---

**Built on Sui | Powered by DeepBook | Secured by Seal | Stored on Walrus**

# Solana Note Vault

Solana Note Vault is a decentralized note-taking application built on the Solana blockchain, designed to provide a secure, user-controlled platform for creating, editing, and managing notes. Leveraging Solana's high-speed and low-cost transactions, this DApp ensures that your notes are stored immutably on-chain, offering privacy, security, and persistence without reliance on centralized servers.

## Problem Statement

In today's digital world, note-taking applications often rely on centralized servers, which pose several challenges:
- **Data Privacy**: Centralized platforms can access, store, or share user data, raising concerns about privacy breaches or unauthorized use.
- **Data Loss**: Notes stored on centralized servers are vulnerable to server failures, data corruption, or service discontinuation.
- **Lack of Ownership**: Users often lack full control over their data, with platforms imposing restrictions on access or requiring subscriptions.
- **Security Risks**: Centralized systems are prime targets for hacks, potentially exposing sensitive user information.

These issues make it difficult for users to trust traditional note-taking apps with sensitive or personal information, especially for those who value data sovereignty and security.

## How Solana Note Vault Solves the Problem

Solana Note Vault addresses these challenges by leveraging the Solana blockchain to create a decentralized, secure, and user-centric note-taking experience:
- **Decentralized Storage**: Notes are stored on the Solana blockchain using program-derived addresses (PDAs), ensuring immutability and persistence without reliance on centralized servers.
- **User Control**: Users manage their notes using their Solana wallet, giving them full ownership and control over their data. Only the wallet owner can create, update, or delete their notes.
- **Enhanced Security**: The app uses Solana's cryptographic mechanisms to ensure that notes are securely tied to the user's wallet, preventing unauthorized access.
- **Cost-Effective and Fast**: Solana's high-throughput and low-cost transactions make it affordable and efficient to store and manage notes on-chain.
- **Immutable Record**: Each note includes timestamps for creation and last update, providing a verifiable history that cannot be altered retroactively.
- **Intuitive Interface**: A modern, user-friendly UI with a modal-based note creation system and visually appealing note cards ensures a seamless experience while maintaining decentralization.

By decentralizing note-taking, Solana Note Vault empowers users to maintain privacy, security, and ownership of their data, solving the core issues of centralized note-taking apps.

## Features

- **Create Notes**: Add new notes with a title (up to 100 characters) and content (up to 1000 characters) via a sleek modal interface triggered by an "Add Note" button.
- **Edit Notes**: Update existing notes directly within the note card, with real-time validation for content length.
- **Delete Notes**: Securely delete notes, with all actions tied to the user's Solana wallet for authorization.
- **Responsive Note Cards**: Display notes in a grid of visually appealing cards with gradient headers, avatars, and timestamps, supporting 1–3 columns based on screen size.
- **Wallet Integration**: Seamlessly connect with Solana wallets using `@solana/wallet-adapter-react` for secure authentication and transaction signing.
- **Real-Time Feedback**: Character counters and error messages provide immediate feedback for title and content inputs.
- **Immutable Timestamps**: Each note includes creation and update timestamps stored on-chain, ensuring a verifiable history.
- **Modern UI**: Built with Next.js, Tailwind CSS, and the Inter font, featuring hover effects, smooth transitions, and a teal/cyan color scheme for a polished look.

## Installation Guide

### Prerequisites
- **Node.js**: Version 18 or higher
- **npm** or **yarn**: For package management
- **Solana Wallet**: A Solana-compatible wallet (e.g., Phantom, Solflare) installed in your browser
- **Solana CLI** (optional): For local blockchain testing
- **Git**: For cloning the repository

### Steps to Install and Run

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/solana-note-vault.git
   cd solana-note-vault
   ```

2. **Install Dependencies**
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the project root and add the following:
   ```env
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
   ```
   Replace the URL with your preferred Solana RPC endpoint (e.g., Mainnet, Testnet, or a local node).

4. **Run the Development Server**
   Using npm:
   ```bash
   npm run dev
   ```
   Or using yarn:
   ```bash
   yarn dev
   ```
   The app will be available at `http://localhost:3000`.

5. **Connect Your Solana Wallet**
   - Open the app in a browser with a Solana wallet extension installed (e.g., Phantom).
   - Click "Connect Wallet" to authenticate and start managing notes.

6. **Build for Production** (optional)
   To create an optimized production build:
   ```bash
   npm run build
   npm run start
   ```
   Or with yarn:
   ```bash
   yarn build
   yarn start
   ```

### Testing on Solana Devnet
- Ensure your wallet is set to the Solana Devnet network.
- Fund your wallet with Devnet SOL using a faucet (e.g., `https://faucet.solana.com`).
- The app is preconfigured to use the provided `PROGRAM_ID` for the Solana Notes program on Devnet.

## Project Structure
- `pages/index.tsx`: Main `Home` component with the note-taking UI and Solana integration.
- `pages/_app.tsx`: App wrapper with `WalletContextProvider` for wallet connectivity.
- `components/WalletContextProvider.tsx`: Configures Solana wallet adapter for React.
- `styles/globals.css`: Global styles with Tailwind CSS and custom variables.
- `public/`: Static assets (e.g., favicon).

## Dependencies
- `@project-serum/anchor`: For interacting with the Solana program.
- `@solana/wallet-adapter-react`: For wallet integration.
- `@solana/web3.js`: For Solana blockchain interactions.
- `next`: For server-side rendering and static site generation.
- `tailwindcss`: For styling the UI.
- `inter`: For the Inter font used throughout the app.

## Usage
1. **Connect Wallet**: On loading the app, connect your Solana wallet to authenticate.
2. **Create a Note**: Click the "Add Note" button to open the modal, enter a title and content, and click "Create Note."
3. **View Notes**: Notes are displayed in a responsive grid of cards, each showing the title, content, author, and timestamps.
4. **Edit a Note**: Click "Edit" on a note card, modify the content in the textarea, and click "Save."
5. **Delete a Note**: Click "Delete" on a note card to remove it from the blockchain.
6. **Error Handling**: The app provides real-time feedback for invalid inputs (e.g., empty fields, exceeding character limits).

## Future Improvements
- **Rich Text Support**: Allow formatting (bold, italic, lists) in note content.
- **Note Sharing**: Enable sharing notes with other Solana wallets via public keys.
- **Search Functionality**: Add a search bar to filter notes by title or content.
- **Offline Caching**: Cache notes locally for faster loading and offline access.
- **Custom Avatars**: Allow users to upload custom avatars for notes instead of using Dicebear.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request with a detailed description of your changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For questions or support, open an issue on the GitHub repository or contact the maintainers at `your-email@example.com`.
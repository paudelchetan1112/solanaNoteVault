"use client";
import { useRouter } from "next/navigation";

export default function Docs() {
  const router = useRouter();

  return (
    <div className={`p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg min-h-screen`}>
      <div className={`flex justify-between items-center mb-8`}>
        <h1 className={`text-4xl font-extrabold text-gray-800`}>Solana Note Vault Documentation</h1>
        <button
          onClick={() => router.push(`/`)}
          className={`flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105`}
        >
          <svg className={`w-5 h-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`} xmlns={`http://www.w3.org/2000/svg`}>
            <path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6`}></path>
          </svg>
          Back to Home
        </button>
      </div>

      <section className={`mb-12`}>
        <h2 className={`text-3xl font-bold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2`}>Introduction</h2>
        <p className={`text-gray-600 leading-relaxed`}>
          Welcome to the official documentation for Solana Note Vault. This decentralized application (DApp) is a groundbreaking tool for secure and private note-taking, built entirely on the <span className="text-green">Solana blockchain</span> . By moving beyond traditional, centralized databases, Solana Note Vault ensures that your notes are not just stored, but are verifiably owned by you. The system leverages  <span className="text-green">on-chain storage</span>  and  <span className="text-green">program-derived addresses (PDAs)</span> to guarantee data immutability, censorship resistance, and true user ownership. This document provides a comprehensive guide for both users and developers to understand the functionality, technical architecture, and operational aspects of the DApp.
        </p>
      </section>

      <section className={`mb-12`}>
        <h2 className={`text-3xl font-bold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2`}>Key Features</h2>
        <ul className={`list-disc pl-6 space-y-4 text-gray-600 leading-relaxed`}>
          <li>
            <strong>Decentralized Storage:</strong> All notes are stored directly on the Solana blockchain, making them persistent and resistant to censorship or data loss from centralized server failures.
          </li>
          <li>
            <strong>Full Ownership and Control:</strong> Utilizing your Solana wallet for authentication, all actions—creation, editing, and deletion—are authorized by you, ensuring that no one else can access or modify your notes.
          </li>
          <li>
            <strong>Responsive and Intuitive UI:</strong> The front end, built with Next.js and Tailwind CSS, offers a clean, modern, and highly responsive interface that works seamlessly across all devices.
          </li>
          <li>
            <strong>Real-time Validation:</strong> Provides immediate, user-friendly feedback on input fields, enforcing a maximum title length of 100 characters and content length of 1000 characters to optimize on-chain data storage.
          </li>
          <li>
            <strong>Secure Wallet Integration:</strong> The DApp integrates with popular wallets like Phantom and Solflare using the secure Solana Wallet Adapter, abstracting away the complexities of blockchain interactions.
          </li>
          <li>
            <strong>Unique Visual Identifiers:</strong> Each note is visually distinguished with a unique, automatically generated avatar based on its title, adding a personalized touch to your note collection.
          </li>
        </ul>
      </section>

      <section className={`mb-12`}>
        <h2 className={`text-3xl font-bold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2`}>Getting Started: A User Guide</h2>
        <ol className={`list-decimal pl-6 space-y-6 text-gray-600 leading-relaxed`}>
          <li>
            <strong>Step 1: Connect Your Solana Wallet</strong>
            <p className={`mt-2`}>Launch the Solana Note Vault application and click the `Connect Wallet` button in the top-right corner. A pop-up from your wallet extension (e.g., Phantom, Solflare) will appear, requesting your permission to connect. Approve the connection to authenticate yourself and link your public key to the DApp.</p>
          </li>
          <li>
            <strong>Step 2: Create a New Note</strong>
            <p className={`mt-2`}>Once your wallet is connected, a `Create Note` button will become visible. Clicking it will open a modal where you can input your note's title and content. Fill in the details, click `Create Note`, and approve the transaction in your wallet. The note will be processed and stored on the Solana blockchain.</p>
          </li>
          <li>
            <strong>Step 3: View and Manage Your Notes</strong>
            <p className={`mt-2`}>Your notes will be displayed in a dynamic grid. Each card represents a note, showing its title, a snippet of its content, the author's public key, and a timestamp. All notes are fetched in real-time from the blockchain.</p>
          </li>
          <li>
            <strong>Step 4: Edit a Note</strong>
            <p className={`mt-2`}>To edit an existing note, hover over the note card and click the `Edit` button. This will open the modal with the note's existing content pre-filled. Make your changes and click `Save`. You'll be prompted to sign another transaction to commit the update to the blockchain.</p>
          </li>
          <li>
            <strong>Step 5: Delete a Note</strong>
            <p className={`mt-2`}>If you wish to permanently remove a note, click the `Delete` button on the note card. A confirmation dialog will appear, followed by a wallet transaction request. Once approved, the note's account will be closed and its data removed from the blockchain.</p>
          </li>
        </ol>
      </section>

      <section className={`mb-12`}>
        <h2 className={`text-3xl font-bold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2`}>Technical Deep Dive</h2>
        <p className={`text-gray-600 leading-relaxed mb-4`}>
          The Solana Note Vault is built on a robust, open-source technical stack. Understanding these components is key to grasping the DApp's security and functionality.
        </p>
        <ul className={`list-disc pl-6 space-y-4 text-gray-600 leading-relaxed`}>
          <li>
            <strong>On-Chain Program:</strong> The core logic of the DApp resides in a Solana program deployed at the address: <code>EuXGJJMr69HGJycN5TMNF7ek3d1fxMSKMpqFbWqMmeH7</code>. This program defines the rules for creating, updating, and deleting note data.
          </li>
          <li>
            <strong>Anchor Framework:</strong> We use the <span className="text-green">Anchor framework</span>  for writing the Solana program. Anchor streamlines development by providing a clear structure, robust serialization, and simplified client-side interaction with the program's functions.
          </li>
          <li>
            <strong>Program-Derived Addresses (PDAs):</strong> Instead of using keypairs, notes are stored in accounts created at a PDA. A PDA is a cryptographic hash of seeds (in our case, the user's public key and the note title) and the program ID. This guarantees that each note has a unique, deterministic address and that only the program can control it, ensuring security.
          </li>
          <li>
            <strong>Solana Wallet Adapter:</strong> This suite of libraries (`@solana/wallet-adapter-react`, `@solana/wallet-adapter-base`, etc.) handles the communication between the DApp and the user's wallet, ensuring a secure and standardized transaction signing process.
          </li>
          <li>
            <strong>Frontend Technologies:</strong> The application is a single-page DApp built with <span className="text-green">Nextjs </span>, styled with  , and uses the Inter font for a clean, professional aesthetic.
          </li>
        </ul>
      </section>

      <section className={`mb-12`}>
        <h2 className={`text-3xl font-bold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2`}>Error Handling and Troubleshooting</h2>
        <p className={`text-gray-600 leading-relaxed`}>
          The DApp includes comprehensive error handling to provide clarity on transaction failures.
        </p>
        <h3 className={`text-xl font-semibold mt-6 mb-2`}>Program-Specific Errors</h3>
        <ul className={`list-disc pl-6 space-y-2 text-gray-600`}>
          <li>
            <strong>`TitleTooLong (Code: 6000)`:</strong> The title exceeds the maximum limit of 100 characters.
          </li>
          <li>
            <strong>`ContentTooLong (Code: 6001)`:</strong> The note content exceeds the maximum limit of 1000 characters.
          </li>
          <li>
            <strong>`TitleEmpty (Code: 6002)`:</strong> The title field was left blank.
          </li>
          <li>
            <strong>`ContentEmpty (Code: 6003)`:</strong> The content field was left blank.
          </li>
          <li>
            <strong>`Unauthorized (Code: 6004)`:</strong> This is a critical security error. It indicates that the transaction signer is not the original creator of the note, and therefore cannot modify or delete it.
          </li>
        </ul>

        <h3 className={`text-xl font-semibold mt-6 mb-2`}>General Troubleshooting</h3>
        <ul className={`list-disc pl-6 space-y-2 text-gray-600`}>
          <li>
            <strong>Issue: My wallet isn't connecting.</strong>
            <p className={`mt-1`}>Solution:Ensure your wallet extension is enabled in your browser and is set to the correct Solana network (`Devnet` is the default for this DApp). Try refreshing the page and reconnecting.</p>
          </li>
          <li>
            <strong>Issue: My transaction failed.</strong>
            <p className={`mt-1`}>Solution: Check your wallet balance. All on-chain actions require a small amount of SOL for transaction fees. If you're on Devnet, use a  <span className="text-green">Solana faucet</span> to get more test SOL. Also, check the specific error code for a more detailed explanation.</p>
          </li>
          <li>
            <strong>Issue: Notes aren't loading on the page.</strong>
            <p className={`mt-1`}>Solution: Verify your internet connection. If the issue persists, there may be a problem with the Solana RPC (Remote Procedure Call) endpoint. Ensure the URL in your `env.local` file is correct and the network is stable.</p>
          </li>
        </ul>
      </section>

      <section>
        <h2 className={`text-3xl font-bold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2`}>Support & Community</h2>
        <p className={`text-gray-600 leading-relaxed`}>
          For any questions, bug reports, or feature requests, please utilize our community channels. We encourage collaboration and welcome contributions from developers.
        </p>
        <ul className={`list-disc pl-6 space-y-2 mt-4 text-gray-600`}>
          <li>
            <strong>GitHub Repository:</strong> <a href={`https://github.com/your-username/solana-note-vault`} className={`text-teal-600 hover:underline`}>https://github.com/Dharmendra016/solana-note-vault</a>
          </li>
          <li>
            <strong>Contact Maintainers:</strong> <a href={`mailto:info@dharmendrasinghchaudhary.com`} className={`text-teal-600 hover:underline`}>info@dharmendrasinghchaudhary.com</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
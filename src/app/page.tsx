"use client";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'; // Example: Using react-hot-toast for better notifications
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const PROGRAM_ID = new PublicKey("4y3Yk2ZxNMtXidf6CDwnZzvodAcUC2nZqyD3k9pscbTS");
const IDL = {
  "version": "0.1.0",
  "name": "note_vault",
  "constants": [
    {
      "name": "NOTE_SEED",
      "type": "bytes",
      "value": "[110, 111, 116, 101]"
    },
    {
      "name": "POST_SEED",
      "type": "bytes",
      "value": "[112, 111, 115, 116]"
    }
  ],
  "instructions": [
    {
      "name": "createNote",
      "accounts": [
        {
          "name": "noteAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateNote",
      "accounts": [
        {
          "name": "noteAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "updateContent",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteNote",
      "accounts": [
        {
          "name": "noteAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "Note",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "publicKey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "lastUpdate",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TitleTooLong",
      "msg": "Title cannot be longer than 100 chars"
    },
    {
      "code": 6001,
      "name": "ContentTooLong",
      "msg": "Content cannot be longer than 1000 chars"
    },
    {
      "code": 6002,
      "name": "TitleEmpty",
      "msg": "Title cannot be empty"
    },
    {
      "code": 6003,
      "name": "ContentEmpty",
      "msg": "Content cannot be empty"
    },
    {
      "code": 6004,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    }
  ]
};

export default function Home() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState<string | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editNote, setEditNote] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getProgram = useCallback(() => {
    if (!wallet.publicKey || !wallet.signTransaction) return null;
    const provider = new AnchorProvider(connection, wallet as any, {});
    return new Program(IDL as any, PROGRAM_ID, provider);
  }, [wallet, connection]);

  const getNoteAddress = useCallback((title: string) => {
    if (!wallet.publicKey) return null;
    const [noteAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("note"), wallet.publicKey.toBuffer(), Buffer.from(title)],
      PROGRAM_ID
    );
    return noteAddress;
  }, [wallet.publicKey]);

  const loadNotes = useCallback(async () => {
    if (!wallet.publicKey) return;
    try {
      const program = getProgram();
      if (!program) return;
      const notes = await program.account.note.all([
        {
          memcmp: {
            offset: 8,
            bytes: wallet.publicKey.toBase58(),
          },
        },
      ]);
      setNotes(notes);
    } catch (error) {
      toast.error("Error loading notes.");
      console.error(error);
    }
  }, [getProgram, wallet.publicKey]);

  const createNote = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }
    if (title.length > 100) {
      toast.error("Title is too long: 100 chars max.");
      return;
    }
    if (content.length > 1000) {
      toast.error("Content is too long: 1000 chars max.");
      return;
    }
    setLoadingCreate(true);
    try {
      const program = getProgram();
      if (!program) return;
      const noteAddress = getNoteAddress(title);
      if (!noteAddress) {
        toast.error("Failed to derive note address.");
        setLoadingCreate(false);
        return;
      }
      await program.methods
        .createNote(title, content)
        .accounts({
          noteAccount: noteAddress,
          author: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      toast.success("Note created successfully!");
      setTitle("");
      setContent("");
      setShowCreateModal(false);
      await loadNotes();
    } catch (error) {
      console.error("Error creating note", error);
      toast.error("Error creating note.");
    }
    setLoadingCreate(false);
  };

  const updateNote = async (note: any) => {
    if (!editContent.trim()) {
      toast.error("Content cannot be empty.");
      return;
    }
    if (editContent.length > 1000) {
      toast.error("Content too long: 1000 chars max.");
      return;
    }
    setLoadingUpdate(note.publicKey.toBase58());
    try {
      const program = getProgram();
      if (!program) return;
      await program.methods
        .updateNote(editContent)
        .accounts({
          noteAccount: note.publicKey, // Use the actual public key
          author: wallet.publicKey,
        })
        .rpc();
      toast.success("Note updated successfully!");
      setEditContent("");
      setEditNote(null);
      await loadNotes();
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Error updating note.");
    }
    setLoadingUpdate(null);
  };

  const deleteNote = async (note: any) => {
    setLoadingDelete(note.publicKey.toBase58());
    try {
      const program = getProgram();
      if (!program) return;
      await program.methods
        .deleteNote()
        .accounts({
          noteAccount: note.publicKey, // Use the actual public key
          author: wallet.publicKey,
        })
        .rpc();
      toast.success("Note deleted successfully!");
      if (editNote === note.publicKey.toBase58()) {
        setEditNote(null);
        setEditContent("");
      }
      await loadNotes();
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Error deleting note.");
    }
    setLoadingDelete(null);
  };

  const avatarUrl = (seed: string) =>
    `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;

  useEffect(() => {
    if (wallet.connected) {
      loadNotes();
    }
  }, [wallet.connected, loadNotes]);

  if (!wallet.connected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <h2 className="text-3xl font-bold text-gray-800">Connect Your Wallet</h2>
          <WalletMultiButton/>
          <p className="mt-3 text-gray-600">Please connect your Solana wallet to start creating and managing notes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">My Notes</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Note
          </button>
          <button
            onClick={() => router.push("/docs")}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-full shadow-md hover:bg-cyan-600 transition-transform transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Docs
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No notes yet. Click "Add Note" to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => {
            const createdAt = note.account.createdAt
              ? new Date(note.account.createdAt.toNumber() * 1000).toLocaleString()
              : "N/A";
            const updatedAt = note.account.lastUpdate
              ? new Date(note.account.lastUpdate.toNumber() * 1000).toLocaleString()
              : "N/A";
            const noteKey = note.publicKey.toBase58();
            const isEditingThis = editNote === noteKey;

            return (
              <div
                key={noteKey}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl border border-gray-200"
              >
                {/* Note Card Header */}
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 flex items-center gap-3">
                  <img
                    src={avatarUrl(note.account.title)}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">{note.account.title}</h3>
                    <p className="text-xs text-teal-100 truncate">{note.account.author.toBase58()}</p>
                  </div>
                </div>

                {/* Note Content */}
                <div className="p-4">
                  {isEditingThis ? (
                    <textarea
                      maxLength={1000}
                      rows={4}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                      placeholder="Edit note content..."
                    />
                  ) : (
                    <p className="text-gray-700 line-clamp-4">{note.account.content}</p>
                  )}
                </div>

                {/* Note Footer */}
                <div className="px-4 py-3 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
                  <div>
                    <p>Created: {createdAt}</p>
                    <p>Updated: {updatedAt}</p>
                  </div>
                  <div className="flex gap-2">
                    {isEditingThis ? (
                      <>
                        <button
                          onClick={() => updateNote(note)}
                          disabled={loadingUpdate === noteKey || !editContent.trim()}
                          className={`px-3 py-1 rounded-md text-white ${
                            loadingUpdate === noteKey || !editContent.trim()
                              ? "bg-green-300 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditNote(null);
                            setEditContent("");
                            toast.dismiss(); // Dismiss any toasts
                          }}
                          className="px-3 py-1 rounded-md bg-gray-400 text-white hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditNote(noteKey);
                            setEditContent(note.account.content);
                            toast.dismiss(); // Dismiss any toasts
                          }}
                          className="px-3 py-1 rounded-md bg-teal-600 text-white hover:bg-teal-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteNote(note)}
                          disabled={loadingDelete === noteKey}
                          className={`px-3 py-1 rounded-md text-white ${
                            loadingDelete === noteKey ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Note Modal */}
     {showCreateModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Create New Note</h2>
        <button
          onClick={() => {
            setShowCreateModal(false);
            setTitle("");
            setContent("");
            toast.dismiss();
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Title <span className={`text-xs ${title.length > 100 ? "text-red-500" : "text-gray-500"}`}>({title.length}/100)</span>
          </label>
<input
  id="note-title"
  type="text"
  maxLength={100}
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Enter note title"
  className={`w-full p-3 border rounded-md text-black ${
    title.length > 100 ? "border-red-500" : "border-gray-300"
  } focus:outline-none focus:ring-2 focus:ring-cyan-400`}
/>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Content <span className={`text-xs ${content.length > 1000 ? "text-red-500" : "text-gray-500"}`}>({content.length}/1000)</span>
          </label>
         <textarea
  id="note-content"
  maxLength={1000}
  rows={5}
  value={content}
  onChange={(e) => setContent(e.target.value)}
  placeholder="Write your note here..."
  className={`w-full p-3 border rounded-md ${
    content.length > 1000 ? "border-red-500" : "border-gray-300"
  } focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none`}
  style={{ color: 'black' }}
/>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setShowCreateModal(false);
              setTitle("");
              setContent("");
              toast.dismiss();
            }}
            className="px-4 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            disabled={loadingCreate || !title.trim() || !content.trim() || title.length > 100 || content.length > 1000}
            onClick={createNote}
            className={`px-4 py-2 rounded-md text-white ${
              loadingCreate ? "bg-cyan-300 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-700"
            }`}
          >
            {loadingCreate ? "Creating..." : "Create Note"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
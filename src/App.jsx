
import { useState } from "react";
import axios from "axios";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!emailContent.trim()) return;

    setLoading(true);
    setError("");
    setGeneratedReply("");
    setCopied(false);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        { emailContent, tone }
      );

      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Unable to generate reply. Check your backend and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedReply) return;

    try {
      await navigator.clipboard.writeText(generatedReply);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy. Please copy the reply manually.");
    }
  };

  const tones = [
    "Professional",
    "Friendly",
    "Casual",
    "Formal",
    "Apologetic",
    "Persuasive",
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#0b0b14] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(113,75,235,0.17),transparent_48%),radial-gradient(ellipse_at_100%_60%,rgba(50,80,180,0.08),transparent_35%)]" />

      <main className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {/* Navbar */}
        <header className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-gradient-to-br from-violet-500 to-violet-800 text-xl shadow-lg shadow-violet-900/30">
              ✉
            </div>

            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-extrabold tracking-tight sm:text-xl">
              Smart Email Assistant
              <span className="text-violet-400">.</span>
            </span>
          </div>

          <span className="shrink-0 rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1.5 text-[9px] font-bold tracking-wider text-violet-300 sm:px-3 sm:text-[10px]">
            ✦ AI POWERED
          </span>
        </header>

        {/* Hero */}
        <section className="mx-auto my-12 max-w-2xl text-center sm:my-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3 py-2 text-[9px] font-bold tracking-[1.5px] text-violet-300 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            YOUR PERSONAL EMAIL ASSISTANT
          </div>

          <h1 className="mt-6 font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-extrabold leading-tight tracking-[-1.8px] sm:text-5xl md:text-6xl">
            Emails that sound
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
              just like you.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#9998ad]">
            Turn your thoughts into polished email replies in seconds.
            Choose your tone, let AI do the writing, and get back to what matters.
          </p>
        </section>

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200"
          >
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="shrink-0 text-lg"
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        {/* Workspace */}
        <section className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Email input card */}
          <div className="flex min-w-0 flex-col rounded-2xl border border-[#29283c] bg-gradient-to-br from-[#171725] to-[#12121d] p-5 shadow-2xl shadow-black/10 transition-colors hover:border-[#484064] sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-xs font-bold text-violet-300">
                  01
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#f1efff]">
                    Original email
                  </h2>
                  <p className="mt-1 text-[11px] text-[#9290a6]">
                    What would you like to reply to?
                  </p>
                </div>
              </div>

              <span className="rounded-md border border-[#353348] bg-[#222132] px-2 py-1 text-[9px] font-bold tracking-wider text-[#aaa5c5]">
                INPUT
              </span>
            </div>

            <textarea
              rows={8}
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder={"Paste the email you received here...\n\nHi, I wanted to follow up regarding..."}
              className="min-h-48 w-full resize-y rounded-xl border border-[#302f43] bg-[#090913]/50 p-4 text-xs leading-7 text-[#e8e6f5] outline-none transition placeholder:text-[#74728a] focus:border-violet-400"
            />

            <div className="mt-3 flex justify-between gap-3 text-[10px] text-[#77758b]">
              <span>✎ Your email content</span>
              <span>{emailContent.length} characters</span>
            </div>

            <div className="mt-7">
              <label
                htmlFor="tone"
                className="mb-3 block text-xs font-semibold text-[#d8d5e9]"
              >
                Choose your tone
              </label>

              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-[#302f43] bg-[#10101b] px-4 py-3.5 text-xs text-[#e8e6f5] outline-none transition focus:border-violet-400"
              >
                {tones.map((item) => (
                  <option key={item} value={item} className="bg-[#1b1a2b]">
                    {item === "Professional" && "💼 "}
                    {item === "Friendly" && "😊 "}
                    {item === "Casual" && "☕ "}
                    {item === "Formal" && "🎩 "}
                    {item === "Apologetic" && "🙏 "}
                    {item === "Persuasive" && "✨ "}
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!emailContent.trim() || loading}
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-violet-700 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-violet-900/20 transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-violet-600 hover:shadow-violet-800/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:from-[#363044] disabled:to-[#363044] disabled:text-[#88819e]"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Crafting your reply...
                </>
              ) : (
                <>
                  <span>✦</span>
                  Generate smart reply
                  <span className="ml-auto text-lg">→</span>
                </>
              )}
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-[#77758b]">
              ✧ AI-generated content may need a quick review before sending.
            </p>
          </div>

          {/* Generated reply card */}
          <div className="flex min-w-0 flex-col rounded-2xl border border-[#29283c] bg-gradient-to-br from-[#171725] to-[#12121d] p-5 shadow-2xl shadow-black/10 transition-colors hover:border-[#484064] sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-xs font-bold text-emerald-300">
                  02
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#f1efff]">
                    Your AI reply
                  </h2>
                  <p className="mt-1 text-[11px] text-[#9290a6]">
                    Ready to review and send
                  </p>
                </div>
              </div>

              <span className="rounded-md border border-emerald-400/15 bg-emerald-400/[0.08] px-2 py-1 text-[9px] font-bold tracking-wider text-emerald-300">
                AI GENERATED
              </span>
            </div>

            <div className="flex min-h-[320px] flex-1 flex-col overflow-hidden rounded-xl border border-dashed border-[#343248] bg-[#080811]/35 sm:min-h-[390px]">
              {loading ? (
                <div className="flex flex-1 flex-col items-center justify-center px-5 py-12 text-center">
                  <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-[#33294f] to-[#1a1729]">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-400" />
                  </div>
                  <h3 className="text-sm font-bold text-[#e5e1f5]">
                    Writing your reply
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#89869f]">
                    Finding the right words and tone...
                  </p>
                </div>
              ) : generatedReply ? (
                <textarea
                  aria-label="Generated email reply"
                  value={generatedReply}
                  onChange={(e) => setGeneratedReply(e.target.value)}
                  className="min-h-[320px] w-full flex-1 resize-y border-0 bg-transparent p-4 text-xs leading-7 text-[#e8e6f5] outline-none focus:ring-1 focus:ring-inset focus:ring-violet-400 sm:min-h-[390px]"
                />
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center px-5 py-12 text-center">
                  <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-[#33294f] to-[#1a1729] text-3xl text-violet-300 shadow-lg shadow-violet-950/20">
                    ✉
                  </div>

                  <h3 className="text-sm font-bold text-[#e5e1f5]">
                    Your perfect reply starts here
                  </h3>

                  <p className="mt-3 max-w-xs text-xs leading-6 text-[#89869f]">
                    Add an email, choose your preferred tone, and let AI craft
                    a thoughtful response for you.
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {["✦ Clear & concise", "✦ Tone-aware", "✦ Ready to edit"].map(
                      (feature) => (
                        <span
                          key={feature}
                          className="rounded-lg border border-[#302c43] bg-[#1b1928] px-2.5 py-2 text-[9px] text-[#b7aed7]"
                        >
                          {feature}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px] text-[#9290a6]">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    generatedReply ? "bg-emerald-400" : "bg-violet-400"
                  }`}
                />
                {generatedReply ? "Reply generated" : "Waiting for your email"}
              </div>

              <button
                onClick={handleCopy}
                disabled={!generatedReply || loading}
                className="rounded-lg border border-[#413957] px-3 py-2 text-[11px] font-semibold text-violet-200 transition hover:border-violet-400 hover:bg-violet-500/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? "✓ Copied!" : "▢ Copy reply"}
              </button>
            </div>
          </div>
        </section>

        <footer className="mt-9 flex flex-wrap justify-between gap-3 border-t border-white/[0.07] py-5 text-[10px] text-[#77758b]">
          <span>
            Made with <span className="text-violet-400">♥</span> and AI
          </span>
          <span>Smart Email Assistant © 2026</span>
        </footer>
      </main>
    </div>
  );
}

export default App;

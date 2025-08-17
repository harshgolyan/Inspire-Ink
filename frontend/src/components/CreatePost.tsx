import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend.harshgolyan308.workers.dev/api/v1/blog/create-blog",
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/blogs");
    }
  };

  // --- Markdown helpers ---
  const insertAtCursor = (before: string, after = "") => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const selected = el.value.slice(start, end);
    const newText = el.value.slice(0, start) + before + selected + after + el.value.slice(end);
    setContent(newText);
    // put cursor after inserted text
    requestAnimationFrame(() => {
      const pos = start + before.length + selected.length + after.length;
      el.focus();
      el.setSelectionRange(pos, pos);
    });
  };

  const applyHeading = (level: 1 | 2 | 3) => {
    const hashes = "#".repeat(level) + " ";
    insertAtCursor("\n" + hashes);
  };

  const applyParagraph = () => insertAtCursor("\n\n"); // just spacing for paragraph
  const applyBold = () => insertAtCursor("**", "**");
  const applyItalic = () => insertAtCursor("*", "*");
  const applyCode = () => insertAtCursor("`", "`");
  const applyQuote = () => insertAtCursor("\n> ");
  const applyUl = () => insertAtCursor("\n- ");
  const applyOl = () => insertAtCursor("\n1. ");
  const applyLink = () => insertAtCursor("[text](", ")");

  return (
    <div className="bg-secondary text-primary min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Stepper */}
        <div className="flex items-center gap-4 mb-10">
          {[1, 2, 3].map((num) => (
            <React.Fragment key={num}>
              <div
                className={`h-9 w-9 flex items-center justify-center border ${
                  step >= num ? "bg-primary text-secondary" : "bg-secondary text-primary"
                }`}
              >
                {num}
              </div>
              {num !== 3 && <div className="flex-1 border-b" />}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Step 1: Title (H1) */}
          {step === 1 && (
            <section>
              <header className="mb-6">
                <h1 className="text-3xl font-bold">Create a New Post</h1>
                <p className="text-sm mt-2 opacity-80">
                  Step 1 · Add a clear headline (H1).
                </p>
              </header>

              <div className="space-y-2">
                <label className="block text-sm font-medium">H1 Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., The Art of Reading and Writing"
                  className="w-full p-3 border focus:outline-none"
                  required
                />
                <div className="text-xs opacity-70">
                  Tip: Keep it concise and descriptive. This becomes your post’s H1.
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Content with Markdown helpers */}
          {step === 2 && (
            <section>
              <header className="mb-6">
                <h2 className="text-2xl font-semibold">Compose Content</h2>
                <p className="text-sm mt-2 opacity-80">
                  Step 2 · Use the toolbar to insert markdown formatting (H2/H3, paragraphs, lists, etc.).
                </p>
              </header>

              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 border-b pb-3 mb-4">
                <button type="button" onClick={() => applyHeading(1)} className="px-3 py-1 border">
                  H1
                </button>
                <button type="button" onClick={() => applyHeading(2)} className="px-3 py-1 border">
                  H2
                </button>
                <button type="button" onClick={() => applyHeading(3)} className="px-3 py-1 border">
                  H3
                </button>
                <button type="button" onClick={applyParagraph} className="px-3 py-1 border">
                  Para
                </button>
                <button type="button" onClick={applyBold} className="px-3 py-1 border">
                  Bold
                </button>
                <button type="button" onClick={applyItalic} className="px-3 py-1 border">
                  Italic
                </button>
                <button type="button" onClick={applyCode} className="px-3 py-1 border">
                  Code
                </button>
                <button type="button" onClick={applyQuote} className="px-3 py-1 border">
                  Quote
                </button>
                <button type="button" onClick={applyUl} className="px-3 py-1 border">
                  • List
                </button>
                <button type="button" onClick={applyOl} className="px-3 py-1 border">
                  1. List
                </button>
                <button type="button" onClick={applyLink} className="px-3 py-1 border">
                  Link
                </button>
              </div>

              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="# Heading 1\n\n## Heading 2\n\nWrite your content here..."
                className="w-full h-72 p-3 border focus:outline-none"
                required
              />

              <div className="text-xs opacity-70 mt-2">
                This editor saves plain markdown. Preview is available in the next step.
              </div>
            </section>
          )}

          {/* Step 3: Preview */}
          {step === 3 && (
            <section>
              <header className="mb-6">
                <h2 className="text-2xl font-semibold">Preview</h2>
                <p className="text-sm mt-2 opacity-80">Step 3 · Review your post before publishing.</p>
              </header>

              <div className="space-y-6">
                <div>
                  <div className="text-sm opacity-70 mb-2">Title (H1)</div>
                  <div className="border p-4">
                    <div className="text-3xl font-bold">{title || "Untitled"}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm opacity-70 mb-2">Content (raw markdown)</div>
                  <div className="border p-4 whitespace-pre-wrap">{content || "_No content yet_"} </div>
                </div>
              </div>
            </section>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between pt-4 border-t">
            {step > 1 ? (
              <button
                type="button"
                className="px-4 py-2 border"
                onClick={() => setStep((s) => (s === 2 ? 1 : 2))}
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                className="px-5 py-2 border bg-primary text-secondary"
                onClick={() => setStep((s) => (s === 1 ? 2 : 3))}
                disabled={step === 1 && !title}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="px-5 py-2 border bg-primary text-secondary">
                Publish
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Jentley Web Design" },
      { name: "description", content: "Read real customer reviews of Jentley and leave your own." },
      { property: "og:title", content: "Reviews — Jentley Web Design" },
      { property: "og:description", content: "Real customer reviews of Jentley. Leave your own." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reviews,
});

type Review = { id: string; name: string; rating: number; comment: string; created_at: string };

function Stars({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className="disabled:cursor-default"
        >
          <Star className={`h-5 w-5 ${n <= value ? "fill-accent text-accent" : "text-muted-foreground"}`} />
        </button>
      ))}
    </div>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const load = async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    setReviews(data ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || comment.trim().length < 3) return;
    setStatus("sending");
    const { error } = await supabase
      .from("reviews")
      .insert({ name: name.trim().slice(0, 60), rating, comment: comment.trim().slice(0, 1000) });
    if (error) return setStatus("error");
    setName("");
    setComment("");
    setRating(5);
    setStatus("done");
    load();
  };

  const field = "w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:border-accent";

  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-accent">Reviews</p>
        <h1 className="text-4xl sm:text-6xl">What customers say.</h1>
        <div className="mt-12 space-y-4">
          {reviews === null ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : reviews.length === 0 ? (
            <div className="rounded-md border border-dashed border-border p-10 text-center text-muted-foreground">
              No reviews yet. Worked with us? Be the first to leave one.
            </div>
          ) : (
            reviews.map((r) => (
              <article key={r.id} className="rounded-md border border-border bg-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg">{r.name}</h3>
                  <Stars value={r.rating} />
                </div>
                <p className="mt-3 whitespace-pre-line text-muted-foreground">{r.comment}</p>
                <p className="mt-4 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
              </article>
            ))
          )}
        </div>
      </div>
      <form onSubmit={submit} className="h-fit space-y-4 rounded-md border border-border bg-card p-6 lg:sticky lg:top-24">
        <h2 className="text-2xl">Write a review</h2>
        <input className={field} placeholder="Your name" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} required />
        <Stars value={rating} onChange={setRating} />
        <textarea className={`${field} min-h-32`} placeholder="Tell us about your experience" value={comment} maxLength={1000} onChange={(e) => setComment(e.target.value)} required />
        <Button type="submit" disabled={status === "sending"} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          {status === "sending" ? "Posting…" : "Post review"}
        </Button>
        {status === "done" && <p className="text-sm text-accent">Thanks! Your review is posted.</p>}
        {status === "error" && <p className="text-sm text-destructive">Something went wrong. Please try again.</p>}
      </form>
    </section>
  );
}

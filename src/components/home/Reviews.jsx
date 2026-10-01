import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { REVIEWS } from "./reviewsData";
import "./Reviews.css";

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const current = REVIEWS[index];
  const next = REVIEWS[(index + 1) % REVIEWS.length];
  const after = REVIEWS[(index + 2) % REVIEWS.length];

  return (
    <section className="reviews">
      <div className="reviews__header">
        <h2 className="reviews__heading">What people say</h2>
        <div className="reviews__rating">
          <span className="reviews__stars">★★★★★</span>
          <span className="reviews__rating-text">Excellent · Google reviews</span>
        </div>
      </div>

      <div
        className="reviews__stack"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Peeking cards behind, static, just for depth */}
        <div className="reviews__card reviews__card--back2">
          <p>{after.text}</p>
        </div>
        <div className="reviews__card reviews__card--back1">
          <p>{next.text}</p>
        </div>

        {/* Active card, animated */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="reviews__card reviews__card--active"
            initial={{ opacity: 0, y: 24, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -24, rotate: 2 }}
            transition={{ duration: 0.4 }}
          >
            <p className="reviews__quote">“{current.text}”</p>
            <div className="reviews__author">
              <span className="reviews__name">{current.name}</span>
              <span className="reviews__meta">{current.meta}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="reviews__dots">
        {REVIEWS.map((review, i) => (
          <button
            key={review.id}
            className={`reviews__dot ${i === index ? "reviews__dot--active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Show review from ${review.name}`}
          />
        ))}
      </div>
    </section>
  );
}
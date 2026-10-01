import { useRef, useEffect, useState } from "react";
import { useMenuItems } from "../../hooks/useMenuItems";
import FilmFrame from "./FilmFrame";
import "./AvailableToday.css";

export default function AvailableToday() {
  const { items, loading } = useMenuItems();
  const inStock = items.filter((item) => item.stock > 0);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const pausedRef = useRef(false);
  const setWidthRef = useRef(0);

  const [repeatCount, setRepeatCount] = useState(4);

  // Repeat the list enough times to comfortably exceed the viewport width
  const trackItems = Array.from({ length: repeatCount })
    .flatMap(() => inStock);

  useEffect(() => {
    if (loading || inStock.length === 0) return;

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // Work out how many repeats we actually need based on real widths
    const oneSetWidth = track.scrollWidth / repeatCount;
    const viewportWidth = viewport.clientWidth;
    const neededRepeats = Math.ceil((viewportWidth * 2) / oneSetWidth) + 1;

    if (neededRepeats > repeatCount) {
      setRepeatCount(neededRepeats);
      return; // re-run this effect once the extra items have rendered
    }

    setWidthRef.current = oneSetWidth;

    let frameId;
    const speed = 0.5;

    const tick = () => {
      if (!pausedRef.current) {
        positionRef.current += speed;

        if (positionRef.current >= setWidthRef.current) {
          positionRef.current -= setWidthRef.current;
        }

        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [loading, inStock.length, repeatCount]);

  if (!loading && inStock.length === 0) return null;

  return (
    <section className="available-today">
      <h2 className="available-today__heading">Available today</h2>

      <div
        className="available-today__viewport"
        ref={viewportRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => (pausedRef.current = false)}
      >
        <div className="available-today__track" ref={trackRef}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="available-today__skeleton" />
              ))
            : trackItems.map((item, i) => (
                <FilmFrame key={`${item.id}-${i}`} item={item} />
              ))}
        </div>
      </div>
    </section>
  );
}
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

/**
 * @param {{
 *   width?: number | string;
 *   height?: number | string;
 *   cardDistance?: number;
 *   verticalDistance?: number;
 *   delay?: number;
 *   pauseOnHover?: boolean;
 *   onCardClick?: (idx: number) => void;
 *   skewAmount?: number;
 *   easing?: "linear" | "elastic";
 *   children: React.ReactNode;
 * }} props
 */
const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable refs by length only
    [childArr.length],
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef(undefined);
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    if (total === 0) return;

    const makeSlot = (i, distX, distY, totalN) => ({
      x: i * distX,
      y: -i * distY,
      z: -i * distX * 1.5,
      zIndex: totalN - i,
    });

    const placeNow = (el, slot, skew) => {
      if (!el) return;
      gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: "center center",
        zIndex: slot.zIndex,
        force3D: true,
      });
    };

    // Initial placement when refs are ready
    const placeAll = () => {
      const allReady = refs.every((r) => r.current);
      if (!allReady) return;
      refs.forEach((r, i) =>
        placeNow(
          r.current,
          makeSlot(i, cardDistance, verticalDistance, total),
          skewAmount,
        ),
      );
    };
    placeAll();

    const swap = () => {
      if (order.current.length < 2) return;
      const elFront = refs[order.current[0]].current;
      if (!elFront) return;

      const [front, ...rest] = order.current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length,
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return",
      );
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
      tl.to(
        elFront,
        {
          y: backSlot.y,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    // Start first swap after a tick so refs are attached
    const t = window.setTimeout(() => {
      if (refs.every((r) => r.current)) {
        placeAll();
        swap();
        intervalRef.current = window.setInterval(swap, delay);
      }
    }, 50);

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
        window.clearTimeout(t);
      };
    }
    return () => {
      window.clearTimeout(t);
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- config/refs intentionally from closure
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
    childArr.length,
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child,
  );

  return (
    <>
      <style>
        {`.card-swap-container {
  position: relative;
  perspective: 900px;
  overflow: visible;
}

.card-swap-container .card {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 12px;
  border: 1px solid var(--color-border, rgba(255,255,255,0.2));
  background: var(--color-surfaceElevated, #1a1a1a);
  transform-style: preserve-3d;
  will-change: transform;
  backface-visibility: hidden;
}

@media (max-width: 768px) {
  .card-swap-container {
    transform: scale(0.85);
  }
}

@media (max-width: 480px) {
  .card-swap-container {
    transform: scale(0.65);
  }
}`}
      </style>
      <div
        ref={container}
        className="card-swap-container"
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
      >
        {rendered}
      </div>
    </>
  );
};

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

export default CardSwap;

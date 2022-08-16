import { HTMLAttributes, useEffect, useRef } from "react";

interface ShowContentProps {
  className: HTMLAttributes<HTMLDivElement>["className"];
  identifier: string;
  children: any;
  delay?: number;
  offset?: number;
}

function isInViewPort(boundClientRect: DOMRect, offset: number) {
  //console.log(
  //  "bbt",
  //  boundClientRect.top,
  //  window.innerHeight,
  //  boundClientRect.bottom,
  //  {
  //    isTop: boundClientRect.top > window.innerHeight,
  //    isBottom: boundClientRect.bottom <= 0,
  //  }
  //);
  return !(
    (boundClientRect.top + boundClientRect.height + offset ?? 0) >
      window.innerHeight || boundClientRect.bottom < 0
  );
}
function ShowContent({
  className,
  identifier,
  children,
  delay = 0,
  offset = 0,
}: ShowContentProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elRef.current;
    const scrollListener = () => {
      if (element) {
        const bb = element?.getBoundingClientRect();
        //console.log("iivp", element.classList, isInViewPort(bb));
        if (isInViewPort(bb, offset)) {
          if (element.classList.contains("rsvp")) {
            console.log({
              show: isInViewPort(bb, offset),
              top: {
                isIn: bb.top < window.innerHeight,
                top: bb.top,
                wh: window.innerHeight,
                h: bb.height,
              },
              bottom: {
                isIn: bb.bottom < 0,
                bottom: bb.bottom,
              },
            });
          }
          setTimeout(() => {
            element.classList.add("show");
          }, delay);
        }
      }
    };

    document.addEventListener("wheel", scrollListener);
    document.addEventListener("touchmove", scrollListener);

    return () => {
      document.removeEventListener("wheel", scrollListener);
      document.removeEventListener("touchmove", scrollListener);
    };
  }, [delay]);
  return (
    <div className={className} id={identifier} ref={elRef}>
      {children}
    </div>
  );
}

export default ShowContent;

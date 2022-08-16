import { warn } from "console";
import React, { useEffect } from "react";

interface ImageScrollProps {
  src: string;
}

function mapMinMax(
  minValue: number,
  maxValue: number,
  minThreshold: number,
  maxThreshold: number
) {
  const threshold = maxThreshold - minThreshold;
  const value = maxValue - minValue;

  const difference = threshold / value;
  return function (value: number) {
    return minThreshold + difference * (value - minValue);
  };
}

let startY = 0;

function touchstart(e: TouchEvent) {
  startY = e.touches?.[0]?.clientY;
}

const getDeltaY = (e: TouchEvent | WheelEvent) => {
  if (e instanceof TouchEvent) {
    return -(e.touches?.[0]?.clientY - startY);
  }

  return e.deltaY;
};
export default function ImageScroll({ src }: ImageScrollProps) {
  const imageRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imageRef.current;
    const scrollListener = (e: any) => {
      if (img) {
        if (img.clientWidth > 210) {
          e.preventDefault();
          e.stopPropagation();
          console.log("dont allow movement", img.clientWidth);
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }

        if (img.clientWidth <= 210 && img.parentElement) {
          img.parentElement.style.position = "sticky";
          img.parentElement.style.top = "0px";
        } else if (img.parentElement) {
          img.parentElement.style.position = "initial";
        }
        const minMax = mapMinMax(-150, 150, 10, -10);
        const val = minMax(getDeltaY(e));
        console.log("dY", e);

        const imgPrevWidth = Number(img.style.width.replace("%", "") || 100);
        console.log(
          "img sz",
          img.clientWidth,
          img.offsetWidth,
          img.scrollWidth
        );
        // Restrict scale
        console.log("hmst", document.documentElement.scrollTop);
        console.log("screenY", e.screenY);
        const isAtTop = document.documentElement.scrollTop === 0;
        if ((imgPrevWidth >= 200 && val > 0) || !isAtTop) {
          return;
        }
        img.style.width = imgPrevWidth + val + "%";
      }
    };

    window.addEventListener("wheel", scrollListener, { passive: false });
    window.addEventListener("touchmove", scrollListener, { passive: false });
    window.addEventListener("touchstart", touchstart, { passive: false });
    window.addEventListener("touchend", scrollListener, { passive: false });
    document.body.addEventListener("scroll", (e) => {
      e.preventDefault();
    });

    return () => {
      window.removeEventListener("wheel", scrollListener);
      window.removeEventListener("touchmove", scrollListener);
    };
  }, [imageRef]);

  useEffect(() => {
    setTimeout(() => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 50);
  }, []);

  return (
    <div className="image-scroll" ref={imageRef}>
      <img src={src} alt="pozivnica" className="image-scroll_image" />
    </div>
  );
}

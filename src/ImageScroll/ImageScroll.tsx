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
export default function ImageScroll({ src }: ImageScrollProps) {
  const imageRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imageRef.current;
    const scrollListener = (e: any) => {
      if (img) {
        if (img.clientWidth > 200) {
          e.preventDefault();
          e.stopPropagation();
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }

        if (img.clientWidth <= 200 && img.parentElement) {
          img.parentElement.style.position = "sticky";
          img.parentElement.style.top = "0px";
        } else if (img.parentElement) {
          img.parentElement.style.position = "initial";
        }
        const minMax = mapMinMax(-150, 150, 10, -10);
        const val = minMax(e.deltaY);

        const imgPrevWidth = Number(img.style.width.replace("%", "") || 100);
        console.log(
          "img sz",
          img.clientWidth,
          img.offsetWidth,
          img.scrollWidth
        );
        // Restrict scale
        console.log("hmst", document.documentElement.scrollTop);
        const isAtTop = document.documentElement.scrollTop === 0;
        if ((imgPrevWidth >= 100 && val > 0) || !isAtTop) {
          return;
        }
        img.style.width = imgPrevWidth + val + "%";
      }
    };
    window.addEventListener("wheel", scrollListener, { passive: false });
    document.body.addEventListener("scroll", (e) => {
      e.preventDefault();
    });

    return () => {
      window.removeEventListener("wheel", scrollListener);
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

import React from "react";

const IconAddFolder: React.FC<any> = () => {
  return (
    <svg
      width="240"
      height="174"
      viewBox="0 0 240 174"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bg"
    >
      <g filter="url(#filter0_d_586_4410)">
        <path
          d="M143.95 8.00781C156.644 8.00781 178.96 40.1592 190 41H12V24.9009C12.0075 20.4096 13.3032 16.1061 15.6023 12.9368C17.9014 9.7675 21.0157 7.99176 24.2605 8.00003V8.00781H143.95Z"
          fill="white"
        />
        <path
          d="M12 41H220C224.418 41 228 44.5817 228 49V150C228 154.418 224.418 158 220 158H20C15.5817 158 12 154.418 12 150V41Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_586_4410"
          x="0"
          y="0"
          width="240"
          height="174"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood
            floodOpacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite
            in2="hardAlpha"
            operator="out"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_586_4410"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_586_4410"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default IconAddFolder;

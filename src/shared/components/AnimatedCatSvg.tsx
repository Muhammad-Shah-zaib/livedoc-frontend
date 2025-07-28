import React from "react";

interface AnimatedCatSvgProps {
  isSearching: boolean;
}

const AnimatedCatSvg: React.FC<AnimatedCatSvgProps> = ({ isSearching }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cat Body */}
      <ellipse
        cx="50"
        cy="65"
        rx="25"
        ry="20"
        fill="url(#catBodyGradient)"
        className="drop-shadow-sm"
      />

      {/* Cat Head */}
      <circle
        cx="50"
        cy="40"
        r="18"
        fill="url(#catHeadGradient)"
        className="drop-shadow-sm"
      />

      {/* Cat Ears */}
      <path
        d="M35 30 L40 20 L45 30 Z"
        fill="url(#catEarGradient)"
        className="drop-shadow-sm"
      />
      <path
        d="M55 30 L60 20 L65 30 Z"
        fill="url(#catEarGradient)"
        className="drop-shadow-sm"
      />

      {/* Inner Ears */}
      <path d="M37 28 L40 23 L43 28 Z" fill="#FFB6C1" opacity="0.8" />
      <path d="M57 28 L60 23 L63 28 Z" fill="#FFB6C1" opacity="0.8" />

      {/* Cat Eyes - Animated based on search state */}
      <g
        className={`transition-all duration-300 ${
          isSearching ? "translate-x-1" : ""
        }`}
      >
        <ellipse
          cx="43"
          cy="38"
          rx="4"
          ry="5"
          fill="url(#eyeGradient)"
          className="drop-shadow-sm"
        />
        <ellipse
          cx="57"
          cy="38"
          rx="4"
          ry="5"
          fill="url(#eyeGradient)"
          className="drop-shadow-sm"
        />

        {/* Eye pupils - look towards search when typing */}
        <circle
          cx={isSearching ? "45" : "43"}
          cy="38"
          r="2"
          fill="#000"
          className="transition-all duration-300"
        />
        <circle
          cx={isSearching ? "59" : "57"}
          cy="38"
          r="2"
          fill="#000"
          className="transition-all duration-300"
        />

        {/* Eye shine */}
        <circle
          cx={isSearching ? "44.5" : "42.5"}
          cy="37"
          r="0.8"
          fill="white"
          className="transition-all duration-300"
        />
        <circle
          cx={isSearching ? "58.5" : "56.5"}
          cy="37"
          r="0.8"
          fill="white"
          className="transition-all duration-300"
        />
      </g>

      {/* Cat Nose */}
      <path
        d="M48 45 L50 43 L52 45 L50 47 Z"
        fill="#FF69B4"
        className="drop-shadow-sm"
      />

      {/* Cat Mouth */}
      <path
        d="M50 47 Q45 50 40 48"
        stroke="url(#mouthGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 47 Q55 50 60 48"
        stroke="url(#mouthGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cat Whiskers - animate when typing */}
      <g
        className={`transition-all duration-500 ${
          isSearching ? "animate-pulse" : ""
        }`}
      >
        <line
          x1="25"
          y1="42"
          x2="35"
          y2="40"
          stroke="url(#whiskerGradient)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="25"
          y1="46"
          x2="35"
          y2="45"
          stroke="url(#whiskerGradient)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="65"
          y1="40"
          x2="75"
          y2="42"
          stroke="url(#whiskerGradient)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="65"
          y1="45"
          x2="75"
          y2="46"
          stroke="url(#whiskerGradient)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>

      {/* Cat Tail - wags when typing */}
      <path
        d="M25 70 Q15 60 20 45"
        stroke="url(#tailGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        className={`transition-all duration-700 ${
          isSearching ? "animate-bounce" : ""
        }`}
        style={{
          transformOrigin: "25px 70px",
          animationDelay: "0.2s",
          animationDuration: "1s",
        }}
      />

      {/* Paws */}
      <ellipse
        cx="38"
        cy="82"
        rx="4"
        ry="3"
        fill="url(#pawGradient)"
        className="drop-shadow-sm"
      />
      <ellipse
        cx="50"
        cy="84"
        rx="4"
        ry="3"
        fill="url(#pawGradient)"
        className="drop-shadow-sm"
      />
      <ellipse
        cx="62"
        cy="82"
        rx="4"
        ry="3"
        fill="url(#pawGradient)"
        className="drop-shadow-sm"
      />

      {/* Typing indicator - small hearts when typing */}
      {isSearching && (
        <g className="animate-pulse">
          <path
            d="M70 25 C70 22, 72 20, 75 20 C78 20, 80 22, 80 25 C80 28, 75 33, 75 33 C75 33, 70 28, 70 25 Z"
            fill="#FF69B4"
            opacity="0.7"
            className="animate-bounce"
            style={{
              animationDelay: "0s",
              animationDuration: "1.5s",
            }}
          />
          <path
            d="M75 15 C75 13, 76.5 12, 78 12 C79.5 12, 81 13, 81 15 C81 17, 78 20, 78 20 C78 20, 75 17, 75 15 Z"
            fill="#FF1493"
            opacity="0.6"
            className="animate-bounce"
            style={{
              animationDelay: "0.3s",
              animationDuration: "1.5s",
            }}
          />
          <path
            d="M82 20 C82 18.5, 83 17.5, 84.5 17.5 C86 17.5, 87 18.5, 87 20 C87 21.5, 84.5 24, 84.5 24 C84.5 24, 82 21.5, 82 20 Z"
            fill="#FF69B4"
            opacity="0.5"
            className="animate-bounce"
            style={{
              animationDelay: "0.6s",
              animationDuration: "1.5s",
            }}
          />
        </g>
      )}

      <defs>
        <linearGradient
          id="catBodyGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
        <linearGradient
          id="catHeadGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <linearGradient
          id="catEarGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF7F00" />
        </linearGradient>
        <linearGradient
          id="eyeGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#90EE90" />
          <stop offset="100%" stopColor="#32CD32" />
        </linearGradient>
        <linearGradient
          id="mouthGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#A0522D" />
        </linearGradient>
        <linearGradient
          id="whiskerGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#696969" />
          <stop offset="100%" stopColor="#808080" />
        </linearGradient>
        <linearGradient
          id="tailGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF7F00" />
        </linearGradient>
        <linearGradient
          id="pawGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#A0522D" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnimatedCatSvg;

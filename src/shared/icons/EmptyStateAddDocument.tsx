function EmptyStateAddDocument() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle
        cx="200"
        cy="150"
        r="120"
        fill="url(#backgroundGradient)"
        className="opacity-10"
      />

      {/* Document Stack */}
      <rect
        x="140"
        y="100"
        width="80"
        height="100"
        rx="8"
        fill="url(#documentGradient1)"
        className="drop-shadow-lg"
        transform="rotate(-10 180 150)"
      />
      <rect
        x="150"
        y="90"
        width="80"
        height="100"
        rx="8"
        fill="url(#documentGradient2)"
        className="drop-shadow-lg"
        transform="rotate(-5 190 140)"
      />
      <rect
        x="160"
        y="80"
        width="80"
        height="100"
        rx="8"
        fill="url(#documentGradient3)"
        className="drop-shadow-xl"
      />

      {/* Document Lines */}
      <rect
        x="170"
        y="100"
        width="40"
        height="2"
        rx="1"
        fill="white"
        opacity="0.8"
      />
      <rect
        x="170"
        y="110"
        width="50"
        height="2"
        rx="1"
        fill="white"
        opacity="0.6"
      />
      <rect
        x="170"
        y="120"
        width="35"
        height="2"
        rx="1"
        fill="white"
        opacity="0.6"
      />
      <rect
        x="170"
        y="130"
        width="45"
        height="2"
        rx="1"
        fill="white"
        opacity="0.4"
      />

      {/* Plus Icon */}
      <circle
        cx="280"
        cy="100"
        r="20"
        fill="url(#plusGradient)"
        className="drop-shadow-lg animate-bounce"
        style={{ animationDelay: "0.5s", animationDuration: "2s" }}
      />
      <rect x="275" y="90" width="2" height="20" rx="1" fill="white" />
      <rect x="270" y="95" width="20" height="2" rx="1" fill="white" />

      {/* Floating Elements */}
      <circle
        cx="120"
        cy="80"
        r="4"
        fill="url(#floatingGradient)"
        className="animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <circle
        cx="300"
        cy="200"
        r="6"
        fill="url(#floatingGradient)"
        className="animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
      <circle
        cx="100"
        cy="180"
        r="3"
        fill="url(#floatingGradient)"
        className="animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Gradients */}
      <defs>
        <linearGradient
          id="backgroundGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient
          id="documentGradient1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient
          id="documentGradient2"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient
          id="documentGradient3"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="plusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient
          id="floatingGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default EmptyStateAddDocument;

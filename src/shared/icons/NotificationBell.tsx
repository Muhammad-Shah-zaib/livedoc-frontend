const NotificationBell = () => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle */}
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="url(#notificationBg)"
      className="opacity-10"
    />

    {/* Bell Icon */}
    <path
      d="M100 40c-15 0-25 10-25 25v20c0 15-5 25-15 30h80c-10-5-15-15-15-30V65c0-15-10-25-25-25z"
      fill="url(#bellGradient)"
      className="drop-shadow-lg"
    />

    {/* Bell Clapper */}
    <circle cx="100" cy="115" r="4" fill="url(#clapperGradient)" />

    {/* Notification Dots */}
    <circle
      cx="130"
      cy="60"
      r="6"
      fill="url(#dotGradient)"
      className="animate-pulse"
      style={{ animationDelay: "0s" }}
    />
    <circle
      cx="70"
      cy="70"
      r="4"
      fill="url(#dotGradient)"
      className="animate-pulse"
      style={{ animationDelay: "0.5s" }}
    />
    <circle
      cx="140"
      cy="90"
      r="3"
      fill="url(#dotGradient)"
      className="animate-pulse"
      style={{ animationDelay: "1s" }}
    />

    {/* Sound Waves */}
    <path
      d="M130 50c5-5 15-5 20 0"
      stroke="url(#waveGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      className="animate-pulse"
      style={{ animationDelay: "1.5s" }}
    />
    <path
      d="M135 45c8-8 20-8 28 0"
      stroke="url(#waveGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      className="animate-pulse"
      style={{ animationDelay: "2s" }}
    />

    <defs>
      <linearGradient id="notificationBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="bellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="clapperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
    </defs>
  </svg>
);

export default NotificationBell;

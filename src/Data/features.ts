import {
  Users,
  Share2,
  Timer,
  Bell,
  Shield,
  MonitorSmartphone,
} from "lucide-react";

export const features = [
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description:
      "Work together seamlessly with your team. See changes instantly as they happen, with live cursors and real-time editing.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Share2,
    title: "Smart Share Tokens",
    description:
      "Invite collaborators with secure, customizable share tokens. Control permissions and access levels with ease.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Timer, // or Rocket or Activity from lucide-react
    title: "Instant Experience",
    description:
      "Built as a Single Page Application, everything loads once — so you get lightning-fast navigation without delays.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description:
      "Get instant updates when someone requests access, your permissions change, or key activity happens. Stay informed without missing a beat.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Your data is protected with end-to-end encryption and enterprise-grade security measures.",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: MonitorSmartphone,
    title: "Works Everywhere",
    description:
      "Built as a responsive web app, it delivers the full experience on desktop, tablet, and mobile — no downloads needed.",
    color: "from-indigo-500 to-blue-500",
  },
];

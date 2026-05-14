import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Edit2, X, Send, CheckCircle } from "lucide-react";

interface Match {
  id: number;
  name: string;
  major: string;
  style: string;
  score: number;
  avatar: string;
  color: string;
}

const mockMatches: Match[] = [
  {
    id: 1,
    name: "Alex M.",
    major: "CompSci, 3rd Year",
    style: "Deep Focus",
    score: 96,
    avatar: "AM",
    color: "bg-primary/20 text-primary",
  },
  {
    id: 2,
    name: "Sarah K.",
    major: "Literature, 2nd Year",
    style: "Pomodoro",
    score: 92,
    avatar: "SK",
    color: "bg-secondary/20 text-secondary",
  },
  {
    id: 3,
    name: "Jamie L.",
    major: "BioChem, 4th Year",
    style: "Low-Pressure",
    score: 88,
    avatar: "JL",
    color: "bg-primary/20 text-primary",
  },
  {
    id: 4,
    name: "Taylor M.",
    major: "BSIT, 1st Year",
    style: "Deep Focus",
    score: 85,
    avatar: "TM",
    color: "bg-secondary/20 text-secondary",
  },
];

export default function Matches() {
  const [profileExists, setProfileExists] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [message, setMessage] = useState("");
  const [connectionState, setConnectionState] = useState<"input" | "sending" | "success">("input");

  useEffect(() => {
    const saved = localStorage.getItem("ql-user-profile");
    setProfileExists(!!saved);
  }, []);

  const handleConnect = (match: Match) => {
    setSelectedMatch(match);
    setMessage("");
    setConnectionState("input");
  };

  const handleSendConnection = async () => {
    setConnectionState("sending");
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setConnectionState("success");
  };

  const handleCloseModal = () => {
    setSelectedMatch(null);
    setConnectionState("input");
    setMessage("");
  };

  if (!profileExists) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-card rounded-3xl border border-border p-12 text-center">
            <h1 className="text-3xl font-bold mb-4">No profile found</h1>
            <p className="text-muted-foreground mb-8">
              Create a profile first to see your compatible study matches.
            </p>
            <Link
              to="/create-profile"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
            >
              Create your profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your matches</h1>
              <p className="text-muted-foreground">
                Nearby students who fit your quiet study style.
              </p>
            </div>
            <Link
              to="/create-profile"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition"
            >
              <Edit2 className="w-4 h-4" />
              Edit profile
            </Link>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="space-y-4">
          {mockMatches.map((match) => (
            <div
              key={match.id}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg animate-bounce-gentle ${match.color}`}
                    style={{ animationDelay: `${match.id * 0.2}s` }}
                  >
                    {match.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{match.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {match.major} • {match.style}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-primary">{match.score}%</p>
                    <p className="text-xs text-muted-foreground">match</p>
                  </div>
                  <button
                    onClick={() => handleConnect(match)}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-border p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">More matches available</h2>
          <p className="text-muted-foreground mb-6">
            Our algorithm is constantly finding new compatible study partners
            for you.
          </p>
          <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">
            Refresh matches
          </button>
        </div>
      </div>

      {/* Connection Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-md w-full p-6 sm:p-8">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Input State */}
            {connectionState === "input" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Send an intro</h2>
                  <p className="text-muted-foreground">
                    Start a conversation with {selectedMatch.name}
                  </p>
                </div>

                {/* Match Preview */}
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base animate-bounce-gentle ${selectedMatch.color}`}
                    >
                      {selectedMatch.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{selectedMatch.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedMatch.major}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded-lg bg-background text-xs font-semibold text-primary">
                      {selectedMatch.score}% match
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-background text-xs font-semibold">
                      {selectedMatch.style}
                    </span>
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your message (optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi! I'd love to study together... (or leave blank for auto message)"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {message.length} characters
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-muted text-foreground font-semibold hover:bg-muted transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendConnection}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* Sending State */}
            {connectionState === "sending" && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">Sending connection...</h3>
                <p className="text-muted-foreground">
                  We're letting {selectedMatch.name} know you'd like to study together
                </p>
              </div>
            )}

            {/* Success State */}
            {connectionState === "success" && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Connection sent! 🎉</h3>
                <p className="text-muted-foreground mb-6">
                  {selectedMatch.name} will see your request soon. You'll get notified when they respond.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

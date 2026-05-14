import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";

interface Profile {
  name: string;
  major: string;
  year: string;
  style: string;
}

export default function CreateProfile() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Profile>({
    name: "",
    major: "",
    year: "2",
    style: "deep",
  });

  useEffect(() => {
    const saved = localStorage.getItem("ql-user-profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
      } catch {}
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleStyleChange = (style: string) => {
    setProfile((prev) => ({ ...prev, style }));
  };

  const handleSubmit = () => {
    localStorage.setItem("ql-user-profile", JSON.stringify(profile));
    navigate("/matches");
  };

  const canContinue = {
    1: profile.name.trim() && profile.major.trim(),
    2: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className="h-1 flex-1 rounded-full transition"
                style={{
                  backgroundColor: s <= step ? "hsl(var(--primary))" : "hsl(var(--muted))",
                }}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Step {step} of 2
          </p>
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-lg p-8 sm:p-12">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  Create your quiet profile
                </h1>
                <p className="text-muted-foreground">
                  Tell us a bit about yourself so we can find perfect matches.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Choose a pseudonym
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    placeholder="e.g. river_42, quietspark..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    What are you studying?
                  </label>
                  <input
                    type="text"
                    name="major"
                    value={profile.major}
                    onChange={handleInputChange}
                    placeholder="e.g. Computer Science, Philosophy..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Year of study
                  </label>
                  <select
                    name="year"
                    value={profile.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition"
                  >
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year+</option>
                    <option value="grad">Postgrad</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canContinue[1 as keyof typeof canContinue]}
                className="w-full mt-8 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Study Style */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  Your study style
                </h1>
                <p className="text-muted-foreground">
                  How do you prefer to spend your study sessions?
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    value: "deep",
                    icon: "🤫",
                    title: "Deep Focus",
                    desc: "Complete silence, zero interaction",
                  },
                  {
                    value: "pomodoro",
                    icon: "⏳",
                    title: "Pomodoro",
                    desc: "Timed focus sprints with breaks",
                  },
                  {
                    value: "casual",
                    icon: "💬",
                    title: "Low-Pressure",
                    desc: "Occasional quiet questions",
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleStyleChange(option.value)}
                    className={`w-full p-6 rounded-xl border-2 text-left transition ${
                      profile.style === option.value
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{option.icon}</span>
                      <div>
                        <p className="font-semibold text-lg">{option.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {option.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-muted text-foreground font-semibold hover:bg-muted transition"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
                >
                  Find my matches
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, Users, MessageCircle, Calendar, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useRef } from "react";

function AnimatedCounter({ endValue, suffix = "", decimals = 0 }: { endValue: number, suffix?: string, decimals?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);

      setCount(easeOut * endValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, hasStarted]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

export default function Index() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-10 animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 animate-slide-down">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary">
                  Text-based matching
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up animate-delay-100">
                Study together,{" "}
                <span className="text-primary">quietly</span> and without
                pressure
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg animate-slide-up animate-delay-200">
                QuietLink connects you with compatible study partners nearby -
                no awkward introductions, no voice calls required. Just a calm,
                text-first space built for introverts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animate-delay-300">
                <Link
                  to="/create-profile"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:scale-105 transition transform"
                >
                  Find my study match
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-muted text-foreground font-semibold hover:bg-muted hover:scale-105 transition transform"
                >
                  See how it works
                </a>
              </div>

              <p className="mt-8 text-sm text-muted-foreground animate-slide-up animate-delay-400">
                Free to join · No phone number required · 100% text-based
              </p>
            </div>

            <div className="relative hidden md:block">
              <div className="space-y-4">
                <div className="animate-slide-left">
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-lg animate-float hover:shadow-xl transition">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary animate-bounce-gentle">
                        PI
                      </div>
                      <div>
                        <p className="font-semibold">Patrick ron Ignacio</p>
                        <p className="text-sm text-muted-foreground">
                          BSIT, 1st year
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        Game Development
                      </span>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        Web Development
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold">92% match</span>
                      <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: "92%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="animate-slide-left">
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-lg translate-x-8 animate-float hover:shadow-xl transition">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary animate-bounce-gentle">
                        IA
                      </div>
                      <div>
                        <p className="font-semibold">Ivan Karl I. Amoroso</p>
                        <p className="text-sm text-muted-foreground">
                          BSIT, 1st year
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                        Programming Logic
                      </span>
                      <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                        Frontend Development
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold">89% match</span>
                      <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary"
                          style={{ width: "89%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 border-y border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { endValue: 12, suffix: "k+", label: "Students matched", delay: 0, decimals: 0 },
              { endValue: 94, suffix: "%", label: "Report less study anxiety", delay: 100, decimals: 0 },
              { endValue: 200, suffix: "+", label: "Campuses worldwide", delay: 200, decimals: 0 },
              { endValue: 4.9, suffix: " ★", label: "Average app rating", delay: 300, decimals: 1 },
            ].map((stat, i) => (
              <div key={i} className="animate-slide-up text-center" style={{ animationDelay: `${stat.delay}ms` }}>
                <p className="text-5xl md:text-6xl font-bold text-primary mb-2">
                  <AnimatedCounter endValue={stat.endValue} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="text-base text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-secondary/10">
              <span className="text-sm font-semibold text-secondary">
                Simple process
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Three steps to your perfect study partner
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No profile pictures. No voice notes. Just a thoughtfully designed
              questionnaire and our smart compatibility engine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Build your quiet profile",
                desc: "Answer a short questionnaire about your subjects, study style, and preferences. No pressure, no photos.",
                icon: "👤",
              },
              {
                num: "02",
                title: "Get compatibility matches",
                desc: "Our algorithm surfaces partners with overlapping subjects, aligned schedules, and matching energy.",
                icon: "📊",
              },
              {
                num: "03",
                title: "Connect at your own pace",
                desc: "Send a low-stakes text introduction. If both opt in, a study session gets scheduled.",
                icon: "💬",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition"
              >
                <p className="text-5xl font-bold text-primary/30 mb-4">
                  {step.num}
                </p>
                <p className="text-3xl mb-3">{step.icon}</p>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-10 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10">
              <span className="text-sm font-semibold text-primary">
                Built for introverts
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Every feature designed with quieter minds in mind
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <MessageCircle className="w-6 h-6" />,
                title: "Text-only messaging",
                desc: "No voice calls, no video — ever. Communicate at your own comfortable pace.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Anonymous until comfortable",
                desc: "Your real name stays private until you choose to reveal it.",
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Smart compatibility score",
                desc: "Our engine factors in study intensity, break frequency, and communication style.",
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Structured study sessions",
                desc: "Set shared agendas and goals so there's no ambiguity.",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="stories" className="py-16 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-secondary/10">
              <span className="text-sm font-semibold text-secondary">
                Student stories
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              What quieter students are saying
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "I've always struggled to ask classmates for help. QuietLink made it feel safe.",
                author: "Sofia L.",
                role: "BEEd English Major, National Teachers College",
              },
              {
                quote:
                  "The text-only rule completely removed my social anxiety around studying.",
                author: "Takashi N.",
                role: "BSIT Major, National Teachers College",
              },
              {
                quote:
                  "The structured session format means we both show up prepared and just get things done.",
                author: "Anika M.",
                role: "BEEd English Major, National Teachers College",
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-lg">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-lg italic mb-6 text-muted-foreground">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-10 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to find your quiet study companion?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of introverted students already studying smarter
            together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/create-profile"
              className="px-8 py-3 rounded-full bg-primary-foreground text-primary font-semibold hover:opacity-90 transition"
            >
              Get started - it's free
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-3 rounded-full border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import { Send, Sparkles, BookOpen, BarChart3, HelpCircle, Lightbulb } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  role: "user" | "sensei";
  content: string;
}

const quickActions = [
  { icon: Lightbulb, label: "Explain simpler", prompt: "Can you explain that in a simpler way?" },
  { icon: BookOpen, label: "Give example", prompt: "Can you give me a real-world example?" },
  { icon: BarChart3, label: "Show diagram", prompt: "Can you show this as a diagram or visual?" },
  { icon: HelpCircle, label: "Quiz me", prompt: "Quiz me on what I just learned!" },
];

const initialMessages: Message[] = [
  {
    role: "sensei",
    content: "🥋 Greetings, young warrior! I am your **AI Sensei**. Ask me anything — I will guide you with wisdom and clarity. What would you like to learn today?",
  },
];

const AISenseiPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);

    try {
      const childName = user?.user_metadata?.student_name || "Student";
      const response = await fetch("https://syraxo.app.n8n.cloud/webhook-test/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: msg,
          childName: childName
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      let aiText = "I'm sorry, my connection to the Dojo is weak right now!";
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        aiText = data.response || data.text || data.output || data.message || data.aiResponse || JSON.stringify(data);
      } else {
        aiText = await response.text();
      }

      setMessages((prev) => [
        ...prev,
        { role: "sensei", content: aiText },
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "sensei", content: "Oops! My connection to the dojo dropped. Please try again!" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="pt-28 pb-4 bg-section-dark">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-accent flex items-center justify-center text-2xl shadow-[0_0_20px_hsl(var(--glow-gold))]">
                🥋
              </div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
                AI <span className="text-gradient-primary">Sensei</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-sm">Your personal AI tutor — ask anything, learn everything</p>
          </FadeInSection>
        </div>
      </section>

      {/* Chat Area */}
      <section className="bg-section-dark pb-4">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="parchment-bg rounded-2xl border border-border overflow-hidden" style={{ minHeight: "50vh" }}>
            {/* Messages */}
            <div className="p-4 md:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "glass-panel rounded-bl-md border-gold/20"
                    }`}
                  >
                    {msg.role === "sensei" && (
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        <span className="text-xs font-heading font-semibold text-gold">AI Sensei</span>
                      </div>
                    )}
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass-panel rounded-2xl rounded-bl-md px-5 py-3 border-gold/20">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      <span className="text-xs font-heading font-semibold text-gold">AI Sensei</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                      <span className="w-2 h-2 rounded-full bg-gold animate-pulse" style={{ animationDelay: "0.2s" }} />
                      <span className="w-2 h-2 rounded-full bg-gold animate-pulse" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 md:px-6 pb-3">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleSend(action.prompt)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/80 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:scale-105"
                  >
                    <action.icon className="w-3 h-3" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 md:p-6 pt-0">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask your AI Sensei..."
                  className="flex-1 h-12 rounded-xl bg-muted border border-border px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 placeholder:text-muted-foreground"
                />
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="h-12 px-4"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AISenseiPage;

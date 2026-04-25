import { useState } from "react";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import { Check, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const programs = [
  { title: "Junior Innovators", age: "Age 7–10", color: "card-track-pink", textColor: "text-track-pink", seats: 12, total: 20 },
  { title: "Digital Explorers", age: "Age 11–13", color: "card-track-teal", textColor: "text-track-teal", seats: 8, total: 20 },
  { title: "Future Leaders", age: "Age 14–17", color: "card-track-indigo", textColor: "text-track-indigo", seats: 15, total: 20 },
];

const EnrollPage = () => {
  const [step, setStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [form, setForm] = useState({ studentName: "", age: "", grade: "", parentName: "", email: "", password: "", phone: "", city: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEnrollment = async () => {
    if (!form.email || !form.password) {
      toast.error("Please provide both email and password.");
      return;
    }
    
    setIsSubmitting(true);
    
    // 1. Create account in Supabase
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          student_name: form.studentName,
          parent_name: form.parentName,
          age: form.age,
          grade: form.grade,
          phone: form.phone,
          city: form.city,
          program: programs[selectedProgram || 0].title
        }
      }
    });

    if (error) {
      toast.error(error.message);
      setIsSubmitting(false);
      return;
    }

    // 2. Trigger n8n Webhook to save to Airtable & Send Email
    try {
      await fetch("https://syraxo.app.n8n.cloud/webhook-test/enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentName: form.parentName,
          email: form.email,
          password: form.password,
          childName: form.studentName,
          age: form.age,
          grade: form.grade,
          phone: form.phone,
          city: form.city,
          program: programs[selectedProgram || 0].title
        }),
      });
    } catch (err) {
      console.error("Failed to trigger webhook:", err);
      // Continue anyway since account creation succeeded
    }

    setIsSubmitting(false);
    toast.success("Successfully enrolled! Welcome to SYRAXO.");
    navigate("/dashboard");
  };

  return (
    <div className="overflow-hidden">
      <section className="pt-32 pb-8 bg-section-dark">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h1 className="heading-hero mb-8">
              Enroll in <span className="text-gradient-primary">Syraxo Learning</span>
            </h1>

            {/* Progress */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-all ${
                    step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {s === 1 ? "Select Program" : s === 2 ? "Student Info" : "Payment"}
                  </span>
                  {s < 3 && <div className={`w-8 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="section-padding bg-section-dark pt-0">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Step 1 */}
          {step === 1 && (
            <FadeInSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {programs.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedProgram(i)}
                    className={`glass-panel border-2 ${p.color} p-6 text-left transition-all duration-300 ${
                      selectedProgram === i ? "scale-105 glow-primary" : ""
                    }`}
                  >
                    <h3 className={`font-heading font-bold text-lg ${p.textColor} mb-1`}>{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{p.age}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${(p.seats / p.total) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{p.seats}/{p.total}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">seats remaining</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <Button variant="hero" size="lg" onClick={() => selectedProgram !== null && setStep(2)} disabled={selectedProgram === null}>
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </FadeInSection>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <FadeInSection>
              <div className="glass-panel p-8">
                <h3 className="font-heading font-bold text-xl text-foreground mb-6">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "studentName", label: "Student Name", type: "text" },
                    { key: "age", label: "Age", type: "number" },
                    { key: "grade", label: "Grade", type: "text" },
                    { key: "parentName", label: "Parent Name", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                    { key: "password", label: "Password", type: "password" },
                    { key: "phone", label: "Phone", type: "tel" },
                    { key: "city", label: "City", type: "text" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-sm text-muted-foreground mb-1 block">{field.label}</label>
                      <input
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full h-11 rounded-lg bg-muted border border-border px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button variant="hero" size="lg" onClick={() => setStep(3)}>
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </FadeInSection>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <FadeInSection>
              <div className="glass-panel p-8 text-center">
                <h3 className="font-heading font-bold text-xl text-foreground mb-6">Payment</h3>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {["UPI", "Card", "Net Banking"].map((method) => (
                    <div key={method} className="glass-panel px-6 py-3 cursor-pointer hover:border-primary/50 transition-all border border-border">
                      <span className="text-sm text-foreground">{method}</span>
                    </div>
                  ))}
                </div>

                <Button variant="hero" size="xl" className="mb-6" onClick={handleEnrollment} disabled={isSubmitting}>
                  {isSubmitting ? "Enrolling..." : "Complete Enrollment"}
                </Button>

                <div className="flex flex-wrap justify-center gap-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary" /> Secure Payment
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" /> Money Back Guarantee
                  </div>
                </div>
              </div>
              <div className="flex justify-start mt-8">
                <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              </div>
            </FadeInSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default EnrollPage;

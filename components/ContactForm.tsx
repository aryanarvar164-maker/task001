"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: ContactFormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!form.email.trim()) {
    errors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.message.trim()) {
    errors.message = "Enter a message.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardRef = useRef<HTMLFormElement>(null);

  // Entrance animation — a single, deliberate moment rather than scattered motion.
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  function updateField(field: keyof ContactFormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      // NOTE: replace this URL with your own backend/API route.
      // The original endpoint (greatfrontend.com) is a third-party demo
      // target and won't accept real submissions from other projects.
      await axios.post("/api/contact", form);
      toast.success("Message sent — thanks for reaching out!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong sending your message. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      ref={cardRef}
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-lg space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="text-sm text-muted-foreground">
          Send us a message and we&apos;ll get back to you soon.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="How can we help?"
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}

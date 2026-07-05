import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { colors } from "../theme/colors";
import { submitBooking } from "../api/APIHandler";

// ─── Constants ────────────────────────────────────────────────────────────────
const STEPS = ["Your Details", "Trip Preferences", "Review & Confirm"];

const inputBase = {
  width: "100%",
  padding: "12px 14px",
  border: `1.5px solid ${colors.sand}`,
  borderRadius: 10,
  fontSize: 15,
  color: colors.charcoal,
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.2s, box-shadow 0.2s",
  WebkitAppearance: "none",
};

const INITIAL_FORM = {
  // Step 1
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "",
  // Step 2
  travelers: "1",
  startDate: "",
  accommodation: "",
  dietaryNeeds: "",
  specialRequests: ""
};

const REQUIRED = {
  0: ["firstName", "lastName", "email", "phone"],
  1: ["travelers", "startDate"],
};

// ─── Field helpers ─────────────────────────────────────────────────────────────
const Field = ({ label, error, children, hint }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <label
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: error ? "#C0392B" : colors.brand,
        letterSpacing: "0.01em",
      }}
    >
      {label}
    </label>
    {children}
    {hint && !error && (
      <span style={{ fontSize: 11.5, color: colors.textMuted }}>{hint}</span>
    )}
    {error && (
      <span style={{ fontSize: 11.5, color: "#C0392B", fontWeight: 500 }}>
        {error}
      </span>
    )}
  </div>
);

Field.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  hint: PropTypes.string,
  children: PropTypes.node.isRequired,
};

// ─── Step indicator ───────────────────────────────────────────────────────────
const StepIndicator = ({ current, total }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 0,
      marginBottom: 28,
    }}
  >
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            background:
              i < current
                ? colors.jungle
                : i === current
                  ? colors.brand
                  : colors.sand,
            color: i <= current ? "#fff" : colors.textMuted,
            transition: "all 0.3s",
            flexShrink: 0,
            boxShadow: i === current ? `0 0 0 3px rgba(61,31,31,0.15)` : "none",
          }}
        >
          {i < current ? "✓" : i + 1}
        </div>
        {i < total - 1 && (
          <div
            style={{
              width: "clamp(32px, 8vw, 64px)",
              height: 2,
              background: i < current ? colors.jungle : colors.sand,
              transition: "background 0.3s",
            }}
          />
        )}
      </div>
    ))}
  </div>
);

StepIndicator.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

// ─── Review row ───────────────────────────────────────────────────────────────
const ReviewRow = ({ label, value }) =>
  value ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
        padding: "10px 0",
        borderBottom: `1px solid ${colors.sand}`,
      }}
    >
      <span style={{ fontSize: 13, color: colors.textMuted, flexShrink: 0 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: colors.brand,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  ) : null;

ReviewRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

// ─── Main Modal ───────────────────────────────────────────────────────────────
export const BookingModal = ({ trip, isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0);
        setForm(INITIAL_FORM);
        setErrors({});
        setSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  const set = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  };

  const focusStyle = (field) => ({
    ...inputBase,
    borderColor: errors[field] ? "#C0392B" : colors.sand,
  });

  const validate = () => {
    const required = REQUIRED[step] || [];
    const next = {};
    required.forEach((f) => {
      if (!form[f]?.trim()) next[f] = "This field is required";
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await submitBooking(form, trip);
      if (result.success) {
        setSubmitted(true);
      } else {
        console.error('Booking submission failed:', result.error);
      }
    } catch (error) {
      console.error('Unexpected error during booking:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ── Backdrop ───────────────────────────────────────────────────── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26,10,10,0.65)",
          backdropFilter: "blur(4px)",
          zIndex: 2000,
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* ── Modal panel ────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book this trip"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          top: "auto",
          zIndex: 2001,
          background: colors.cream,
          borderRadius: "24px 24px 0 0",
          maxHeight: "92dvh",
          overflowY: "auto",
          boxShadow: "0 -8px 48px rgba(0,0,0,0.25)",
          animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          // On wider screens: centered card
          ...(window.innerWidth >= 640 && {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "min(560px, 94vw)",
            maxHeight: "90dvh",
            borderRadius: 24,
            animation: "fadeScaleIn 0.25s ease",
          }),
        }}
      >
        {/* Drag handle (mobile) */}
        <div
          style={{
            width: 40,
            height: 4,
            background: colors.sand,
            borderRadius: 99,
            margin: "12px auto 0",
            display: window.innerWidth < 640 ? "block" : "none",
          }}
        />

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: colors.cream,
            zIndex: 10,
            padding: "20px 24px 16px",
            borderBottom: `1px solid ${colors.sand}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: colors.gold,
                margin: "0 0 4px",
              }}
            >
              {submitted ? "Confirmed" : `Step ${step + 1} of ${STEPS.length}`}
            </p>
            <h2
              style={{
                fontSize: "clamp(17px, 3vw, 20px)",
                fontWeight: 700,
                fontFamily: "'Nunito', sans-serif",
                color: colors.brand,
                margin: 0,
              }}
            >
              {submitted ? "Booking Request Sent!" : STEPS[step]}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: colors.sand,
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.brand,
              flexShrink: 0,
              marginLeft: 12,
            }}
          >
            ✕
          </button>
        </div>

        {/* ── Trip summary pill ───────────────────────────────────────── */}
        {!submitted && (
          <div
            style={{
              margin: "16px 24px 0",
              background: colors.brand,
              borderRadius: 12,
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.6)",
                  margin: "0 0 2px",
                  fontWeight: 500,
                }}
              >
                Booking for
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {trip.title}
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.6)",
                  margin: "0 0 2px",
                }}
              >
                Duration
              </p>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: colors.goldLight,
                  margin: 0,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {trip.duration}
              </p>
            </div>
          </div>
        )}

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div style={{ padding: "24px 24px 32px" }}>
          {!submitted && <StepIndicator current={step} total={STEPS.length} />}

          {/* ── Step 0: Your Details ──────────────────────────────────── */}
          {step === 0 && !submitted && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Field label="First Name *" error={errors.firstName}>
                  <input
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    style={focusStyle("firstName")}
                    onFocus={(e) =>
                      (e.target.style.borderColor = colors.gold)
                    }
                    onBlur={(e) =>
                    (e.target.style.borderColor = errors.firstName
                      ? "#C0392B"
                      : colors.sand)
                    }
                  />
                </Field>
                <Field label="Last Name *" error={errors.lastName}>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    style={focusStyle("lastName")}
                    onFocus={(e) =>
                      (e.target.style.borderColor = colors.gold)
                    }
                    onBlur={(e) =>
                    (e.target.style.borderColor = errors.lastName
                      ? "#C0392B"
                      : colors.sand)
                    }
                  />
                </Field>
              </div>

              <Field label="Email Address *" error={errors.email}>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  style={focusStyle("email")}
                  onFocus={(e) => (e.target.style.borderColor = colors.gold)}
                  onBlur={(e) =>
                  (e.target.style.borderColor = errors.email
                    ? "#C0392B"
                    : colors.sand)
                  }
                />
              </Field>

              <Field
                label="Phone / WhatsApp *"
                error={errors.phone}
                hint="Include country code, e.g. +1 234 567 8900"
              >
                <input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  style={focusStyle("phone")}
                  onFocus={(e) => (e.target.style.borderColor = colors.gold)}
                  onBlur={(e) =>
                  (e.target.style.borderColor = errors.phone
                    ? "#C0392B"
                    : colors.sand)
                  }
                />
              </Field>

              <Field label="Nationality" error={errors.nationality}>
                <input
                  type="text"
                  placeholder="e.g. American, British, Rwandan..."
                  value={form.nationality}
                  onChange={(e) => set("nationality", e.target.value)}
                  style={focusStyle("nationality")}
                  onFocus={(e) => (e.target.style.borderColor = colors.gold)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = colors.sand)
                  }
                />
              </Field>
            </div>
          )}

          {/* ── Step 1: Trip Preferences ──────────────────────────────── */}
          {step === 1 && !submitted && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Field label="No. of Travelers *" error={errors.travelers}>
                  <select
                    value={form.travelers}
                    onChange={(e) => set("travelers", e.target.value)}
                    style={{
                      ...focusStyle("travelers"),
                      cursor: "pointer",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = colors.gold)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = colors.sand)
                    }
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Preferred Start Date *"
                  error={errors.startDate}
                >
                  <input
                    type="date"
                    value={form.startDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => set("startDate", e.target.value)}
                    style={focusStyle("startDate")}
                    onFocus={(e) =>
                      (e.target.style.borderColor = colors.gold)
                    }
                    onBlur={(e) =>
                    (e.target.style.borderColor = errors.startDate
                      ? "#C0392B"
                      : colors.sand)
                    }
                  />
                </Field>
              </div>

              <Field label="Accommodation Preference">
                <select
                  value={form.accommodation}
                  onChange={(e) => set("accommodation", e.target.value)}
                  style={{ ...inputBase, cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = colors.gold)}
                  onBlur={(e) => (e.target.style.borderColor = colors.sand)}
                >
                  <option value="">No preference</option>
                  <option>Budget (Guesthouse / Hostel)</option>
                  <option>Mid-range (3★ Lodge)</option>
                  <option>Luxury (4–5★ Lodge)</option>
                  <option>Ultra-luxury (Exclusive)</option>
                </select>
              </Field>

              <Field
                label="Dietary Requirements"
                hint="Leave blank if none"
              >
                <input
                  type="text"
                  placeholder="e.g. Vegetarian, Gluten-free, Halal..."
                  value={form.dietaryNeeds}
                  onChange={(e) => set("dietaryNeeds", e.target.value)}
                  style={inputBase}
                  onFocus={(e) => (e.target.style.borderColor = colors.gold)}
                  onBlur={(e) => (e.target.style.borderColor = colors.sand)}
                />
              </Field>

              <Field label="Special Requests" hint="Accessibility needs, celebrations, etc.">
                <textarea
                  rows={3}
                  placeholder="Anything we should know to make your trip perfect..."
                  value={form.specialRequests}
                  onChange={(e) => set("specialRequests", e.target.value)}
                  style={{ ...inputBase, resize: "vertical", minHeight: 80 }}
                  onFocus={(e) => (e.target.style.borderColor = colors.gold)}
                  onBlur={(e) => (e.target.style.borderColor = colors.sand)}
                />
              </Field>
            </div>
          )}

          {/* ── Step 2: Review ────────────────────────────────────────── */}
          {step === 2 && !submitted && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Trip summary */}
              <div
                style={{
                  background: colors.goldPale,
                  border: `1px solid rgba(200,146,42,0.25)`,
                  borderRadius: 14,
                  padding: "16px 18px",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: colors.gold,
                    margin: "0 0 8px",
                  }}
                >
                  Trip Summary
                </p>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: colors.brand,
                    fontFamily: "'Nunito', sans-serif",
                    margin: "0 0 4px",
                  }}
                >
                  {trip.title}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  {[
                    { label: "Duration", val: trip.duration },
                    { label: "Country", val: trip.country },
                    { label: "Difficulty", val: trip.difficulty },
                  ].map(({ label, val }) => (
                    <span
                      key={label}
                      style={{
                        fontSize: 12,
                        color: colors.textMuted,
                        background: "#fff",
                        padding: "3px 10px",
                        borderRadius: 99,
                        border: `1px solid ${colors.sand}`,
                      }}
                    >
                      {label}: <strong style={{ color: colors.brand }}>{val}</strong>
                    </span>
                  ))}
                </div>
              </div>

              {/* Personal details */}
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: colors.textMuted,
                    margin: "0 0 4px",
                  }}
                >
                  Your Details
                </p>
                <ReviewRow label="Name" value={`${form.firstName} ${form.lastName}`} />
                <ReviewRow label="Email" value={form.email} />
                <ReviewRow label="Phone" value={form.phone} />
                <ReviewRow label="Nationality" value={form.nationality} />
              </div>

              {/* Trip preferences */}
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: colors.textMuted,
                    margin: "0 0 4px",
                  }}
                >
                  Trip Preferences
                </p>
                <ReviewRow label="Travelers" value={`${form.travelers} ${form.travelers === "1" ? "person" : "people"}`} />
                <ReviewRow label="Start Date" value={form.startDate} />
                <ReviewRow label="Accommodation" value={form.accommodation || "No preference"} />
                <ReviewRow label="Dietary Needs" value={form.dietaryNeeds || "None"} />
                <ReviewRow label="Special Requests" value={form.specialRequests || "None"} />
              </div>

              {/* Estimated total */}
              {/* <div
                style={{
                  background: colors.brand,
                  borderRadius: 14,
                  padding: "16px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "0 0 2px" }}>
                    Estimated Total
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", margin: 0 }}>
                    Final quote to be confirmed by our team
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: colors.goldLight,
                      fontFamily: "'Nunito', sans-serif",
                      margin: 0,
                    }}
                  >
                    ${(trip.price * parseInt(form.travelers || 1)).toLocaleString()}
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", margin: "2px 0 0" }}>
                    {trip.currency} · {form.travelers} {form.travelers === "1" ? "person" : "people"}
                  </p>
                </div>
              </div> */}

              <p style={{ fontSize: 12, color: colors.textMuted, lineHeight: 1.6, margin: 0 }}>
                By submitting, you agree that our team will contact you within
                24 hours to confirm availability and finalize the booking.
                No payment is taken at this stage.
              </p>
            </div>
          )}

          {/* ── Success state ─────────────────────────────────────────── */}
          {submitted && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 16,
                padding: "8px 0 16px",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: colors.jungle,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                }}
              >
                ✓
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: colors.brand,
                    fontFamily: "'Nunito', sans-serif",
                    margin: "0 0 8px",
                  }}
                >
                  Request Received, {form.firstName}!
                </h3>
                <p
                  style={{
                    fontSize: 14.5,
                    color: colors.textMuted,
                    lineHeight: 1.7,
                    maxWidth: 380,
                    margin: "0 auto",
                  }}
                >
                  Your booking request for{" "}
                  <strong style={{ color: colors.brand }}>{trip.title}</strong>{" "}
                  has been sent. Our team will reach you at{" "}
                  <strong>{form.email}</strong> within 24 hours.
                </p>
              </div>

              {/* What's next */}
              <div
                style={{
                  background: colors.goldPale,
                  border: `1px solid rgba(200,146,42,0.2)`,
                  borderRadius: 14,
                  padding: "16px 20px",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: colors.gold,
                    margin: "0 0 10px",
                  }}
                >
                  What Happens Next
                </p>
                {[
                  "Our team reviews your request",
                  "We confirm availability & send a detailed quote",
                  "You approve and secure your spot",
                ].map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      marginBottom: i < 2 ? 10 : 0,
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: colors.brand,
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {i + 1}
                    </div>
                    <p style={{ fontSize: 13.5, color: colors.brand, margin: 0, lineHeight: 1.5 }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={onClose}
                style={{
                  width: "100%",
                  background: colors.gold,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Done
              </button>
            </div>
          )}

          {/* ── Navigation buttons ────────────────────────────────────── */}
          {!submitted && (
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 28,
                flexDirection: step === 0 ? "row-reverse" : "row",
              }}
            >
              {step > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    flex: 1,
                    background: "#fff",
                    color: colors.brand,
                    border: `1.5px solid ${colors.sand}`,
                    borderRadius: 12,
                    padding: "14px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ← Back
                </button>
              )}

              {step < STEPS.length - 1 ? (
                <button
                  onClick={handleNext}
                  style={{
                    flex: 2,
                    background: colors.brand,
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "14px",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    flex: 2,
                    background: submitting ? colors.textMuted : colors.gold,
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "14px",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: submitting ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  {submitting ? "Submitting..." : "Confirm Booking Request →"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        @keyframes fadeScaleIn { from { opacity: 0; transform: translate(-50%, -48%) scale(0.97) } to { opacity: 1; transform: translate(-50%, -50%) scale(1) } }
      `}</style>
    </>
  );
};

BookingModal.propTypes = {
  trip: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string,
    duration: PropTypes.string,
    country: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
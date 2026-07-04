import { useState } from "react";
import { colors } from "../theme/colors";
import { useSEO } from "../utils/useSEO";
import whatsappIcon from "../assets/icons/whatsapp.png";
import rwandaFlag from "../assets/flags/rwanda.png";
import southSudanFlag from "../assets/flags/south-sudan.png";
import phoneIcon from "../assets/icons/phone.png";
import locationIcon from "../assets/icons/location.png";
import emailIcon from "../assets/icons/email.png";
import fastResponseIcon from "../assets/icons/fast-response.png";
import messageSentIcon from "../assets/icons/mail-sent.png";
import PageHeader from "../components/PageHeader";
import { trackEvent } from "../utils/analytics";



// ─── Contact Page ─────────────────────────────────────────────────────────────
export const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    tripType: "",
    dates: "",
    groupSize: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useSEO({
    title: "Contact Us | IMUT Tours & Travel",
    description: "Get in touch with our team in Kigali. We reply within 24 hours.",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" },
    ],
  });

  const handleChange = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    trackEvent(
      "Lead",
      `Message submitted`,
      "Contact Us Page"
    )
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    border: `1.5px solid ${colors.sand}`,
    borderRadius: 10,
    fontSize: 15,
    color: colors.charcoal,
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const offices = [
    {
      flag: rwandaFlag,
      city: "Kigali",
      country: "Rwanda",
      address: "KK 35 Ave, Kigali",
      phone: "+250 788 608 794",
      email: "customersupport@imut-tours.com",
    },
    {
      flag: southSudanFlag,
      city: "Juba",
      country: "South Sudan",
      address: "Juba Town",
      phone: "+211 (0)917 876 617",
      email: null,
    },
  ];

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: colors.cream }}>
      {/* Header */}
      <PageHeader title={'Reach out to Us'} breadcrumb={
        <span>
          <a href="/">Home</a> / <span>Contact Us</span>
        </span>
      } />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "15px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 48,
          alignItems: "start",
        }}
      >
        {/* Contact Info */}
        <div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: colors.brand,
              fontFamily: "'Nunito', sans-serif",
              margin: "0 0 10px",
            }}
          >
            Our Offices
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {offices.map((o) => (
              <div
                key={o.city}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "24px 22px",
                  border: `1px solid ${colors.sand}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 14,
                  }}
                >
                  {/* <span style={{ fontSize: 28 }}>{o.flag}</span> */}
                  <img src={o.flag} alt="globe" width={42} height={42} />
                  <div>
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: colors.brand,
                        fontFamily: "'Nunito', sans-serif",
                      }}
                    >
                      {o.city}, {o.country}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { icon: locationIcon, val: o.address },
                    { icon: phoneIcon, val: o.phone },
                    { icon: emailIcon, val: o.email },
                  ].map((item, i) => {
                    if (!item.val) return null;
                    return (
                      <div
                        key={i}
                        style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                      >
                        <img src={item.icon} alt="globe" width={18} height={14} />
                        <span style={{ fontSize: 14, color: colors.textMuted }}>
                          {item.val}
                        </span>
                      </div>)
                  })}
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <div
              style={{
                background: "#25D366",
                borderRadius: 16,
                padding: "20px 22px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                <img src={whatsappIcon} alt="globe" width={42} height={42} />
              </div>
              <a
                href="https://wa.me/250788608794"
                onClick={() =>
                  trackEvent(
                    "Lead",
                    "Whatsapp Message Clicked",
                    "Contact Us Page"
                  )
                }
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 2,
                    }}
                  >
                    Chat on WhatsApp
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                    Available Mon–Sat · 7am–8pm EAT
                  </div>
                </div>
              </a>
            </div>

            {/* Response time */}
            <div
              style={{
                background: colors.goldPale,
                borderRadius: 14,
                padding: "16px 20px",
                border: `1px solid rgba(200,146,42,0.2)`,
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <img src={fastResponseIcon} alt="globe" width={42} height={42} />
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: colors.brand,
                    marginBottom: 2,
                  }}
                >
                  Fast Response Guaranteed
                </div>
                <div style={{ fontSize: 13, color: colors.textMuted }}>
                  We reply to all enquiries within 24 hours.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Form */}
        <div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: colors.brand,
              fontFamily: "'Nunito', sans-serif",
              margin: "0 0 10px",
            }}
          >
            Send Us a Message
          </h2>

          {submitted ? (
            <div
              style={{
                background: "#fff",
                border: `2px solid ${colors.jungle}`,
                borderRadius: 20,
                padding: "20px 32px",
                textAlign: "center",
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <img src={messageSentIcon} alt="Message Sent" width={64} height={64} />
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: colors.brand,
                  fontFamily: "'Nunito', sans-serif",
                  margin: "0 0 10px",
                }}
              >
                Message Received!
              </h3>
              <p style={{ color: colors.textMuted, fontSize: 15, lineHeight: 1.7 }}>
                Thank you {form.name}! Our team will get back to you within 24
                hours.
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "32px 28px",
                border: `1px solid ${colors.sand}`,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                { field: "name", label: "Full Name *", placeholder: "Your full name", type: "text" },
                { field: "email", label: "Email *", placeholder: "your@email.com", type: "email" },
                { field: "phone", label: "Phone / WhatsApp", placeholder: "+1 234 567 8900", type: "tel" },
              ].map(({ field, label, placeholder, type }) => (
                <div key={field}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: colors.brand,
                      marginBottom: 6,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = colors.gold)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = colors.sand)
                    }
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: colors.brand,
                    marginBottom: 6,
                  }}
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  placeholder="Tell us about your dream East African experience..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: 100,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = colors.gold)}
                  onBlur={(e) => (e.target.style.borderColor = colors.sand)}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  background: submitting ? colors.textMuted : colors.gold,
                  color: "#fff",
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  padding: "15px",
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 700,
                  width: "100%",
                  transition: "background 0.2s",
                  letterSpacing: "0.02em",
                }}
              >
                {submitting ? "Sending..." : "Send My Enquiry →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

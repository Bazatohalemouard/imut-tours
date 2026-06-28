import PropTypes from "prop-types";
import { colors } from "../theme/colors";
import { useSEO, buildOrganizationSchema, buildWebPageSchema } from "../utils/useSEO";
import conservationIcon from "../assets/icons/forest-conservation.png";
import communityIcon from "../assets/icons/teamwork.png";
import authenticIcon from "../assets/icons/authenticity.png";
import excellenceIcon from "../assets/icons/excellence.png";
import ceoIcon from "../assets/icons/man.png";
import guideIcon from "../assets/icons/tour-guide.png";
import customerSupportIcon from "../assets/icons/customer-service.png";
import emailIcon from "../assets/icons/email.png";
import phoneIcon from "../assets/icons/phone.png";
import PageHeader from "../components/PageHeader";

// ─── About Page ───────────────────────────────────────────────────────────────
export const AboutPage = ({ setPage }) => {
  useSEO({
    title: "About Us | IMUT Tours & Travel",
    description: "IMUT Tours leads authentic safaris across Rwanda, with expert-guided tours extending into Uganda, Kenya, Tanzania, Burundi, and South Sudan.",
    schemas: [
      buildOrganizationSchema(),
      buildWebPageSchema({ name: "About Us", description: "IMUT Tours leads authentic safaris across Rwanda, with expert-guided tours extending into Uganda, Kenya, Tanzania, Burundi, and South Sudan.", path: "/about" }),
    ],
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
    ],
  });

  const team = [
    {
      name: "Jean Bosco Nshimiyimana",
      role: "Managing Director",
      email: 'nshimiyebosco7@gmail.com',
      phone: '(+250) 788 608 794',
      emoji: ceoIcon,
    },
    {
      name: "Mathieu Uwashema",
      role: "Head of tour guide.",
      email: 'uwashemathieu2@gmail.com',
      phone: '(+250) 780 375 925',
      emoji: guideIcon,
    },
    {
      name: "Customer Support",
      role: "Reach us for any inquiries",
      email: 'customersupport@imuttours.com',
      phone: '(+250) 789 925 766',
      emoji: customerSupportIcon,
    },
  ];

  const values = [
    {
      icon: conservationIcon,
      title: "Conservation First",
      desc: "10% of every booking goes directly to gorilla and chimpanzee conservation programs.",
    },
    {
      icon: communityIcon,
      title: "Community Rooted",
      desc: "We employ local guides, partner with community lodges, and support village development.",
    },
    {
      icon: authenticIcon,
      title: "Authentic Experiences",
      desc: "No cookie-cutter tours — every itinerary is crafted to feel genuinely East African.",
    },
    {
      icon: excellenceIcon,
      title: "Excellence Always",
      desc: "From airport pickup to the last game drive, every detail is carefully managed.",
    },
  ];

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh" }}>
      <PageHeader title={'About Us'}/>

      {/* Story section */}
      <section style={{ background: colors.cream, padding: "40px 24px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                color: colors.brand,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                margin: "0 0 20px",
              }}
            >
             Get to know who we are
            </h2>
            <p
              style={{
                color: colors.textMuted,
                fontSize: 15.5,
                lineHeight: 1.8,
                margin: "0 0 16px",
              }}
            >
              IMUT stands for International Marathon United Technology, a name rooted in our origins as a logistics company.
              Our hearts, though, were always drawn to the wild. That passion led us to create IMUT Tours, a specialist division dedicated to authentic East African adventures.

            </p>
            <p
              style={{
                color: colors.textMuted,
                fontSize: 15.5,
                lineHeight: 1.8,
                margin: "0 0 24px",
              }}
            >
              While Rwanda remains the heart of what we do, our guides also lead tours through Uganda, Kenya, Tanzania, Burundi, and South Sudan, bringing the same depth of local knowledge and care to every region we cover.
            </p>
            <button
              onClick={() => setPage("contact")}
              style={{
                background: colors.jungle,
                color: "#fff",
                border: "none",
                cursor: "pointer",
                padding: "14px 28px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p
              style={{
                color: colors.gold,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              What Guides Us
            </p>
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                color: colors.brand,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                margin: 0,
              }}
            >
              Our Core Values
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
            }}
          >
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  background: colors.cream,
                  borderRadius: 16,
                  padding: "28px 22px",
                  border: `1px solid ${colors.sand}`,
                }}
              >
                <img alt={v.title} src={v.icon} style={{ width: 48, height: 48, marginBottom: 14 }} />
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: colors.brand,
                    margin: "0 0 10px",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: colors.textMuted,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: colors.cream, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{
              color: colors.gold,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}>
              The Leadership Behind IMUT
            </p>
            <h2 style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              color: colors.brand,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              margin: 0,
            }}>
              Meet Our Team
            </h2>
          </div>

          {/* Cards grid — always centered regardless of count */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 24,
          }}>
            {team.map((member) => (
              <div
                key={member.name}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "32px 24px",
                  textAlign: "center",
                  border: `1px solid ${colors.sand}`,
                  flex: "1 1 240px",
                  maxWidth: 300,
                }}
              >
                <div style={{
                  width: 72,
                  height: 72,
                  background: colors.brand,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  margin: "0 auto 16px",
                }}>
                  <img
                    src={member.emoji}
                    alt={member.name}
                    style={{
                      width: "70%",
                      height: "70%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: colors.brand,
                  fontFamily: "'Nunito', sans-serif",
                  margin: "0 0 4px",
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: colors.gold,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 12px",
                }}>
                  {member.role}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

                  <a href={`mailto:${member.email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      fontSize: 13,
                      color: colors.brand,
                      textDecoration: "none",
                    }}
                  >
                    <img
                      src={emailIcon}
                      alt="Email"
                      style={{ width: 16, height: 16, flexShrink: 0 }}
                    />
                    {member.email}
                  </a>


                  <a href={`tel:${member.phone}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      fontSize: 13,
                      color: colors.brand,
                      textDecoration: "none",
                    }}
                  >
                    <img
                      src={phoneIcon}
                      alt="Phone"
                      style={{ width: 16, height: 16, flexShrink: 0 }}
                    />
                    {member.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

AboutPage.propTypes = {
  setPage: PropTypes.func.isRequired,
};

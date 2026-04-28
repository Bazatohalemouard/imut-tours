import { colors } from "../theme/colors";
export const Spinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 200,
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        border: `3px solid ${colors.sand}`,
        borderTop: `3px solid ${colors.gold}`,
        borderRadius: "50%",
        animation: "spin 0.9s linear infinite",
      }}
    />
  </div>
);
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const styles = {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: variant === "primary" ? "#007bff" : "#6c757d",
    color: "black",
  };

  return (
    <button style={styles} onClick={onClick}>
      {children}
    </button>
  );
}

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Button = ({
  onClick,
  disabled,
  children,
  className = "",
}: ButtonProps) => (
  <button
    className={`text-white py-2 rounded-md hover:opacity-80 transition ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;

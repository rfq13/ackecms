import LoadingIcon from "../icons/loading";
export default function Button(
  props = {
    type: "primary", // primary | secondary | danger
    size: "md", // sm | md | lg
    children: "Button",
    onClick: () => {},
    disabled: false,
    htmlType: "button",
    isLoading: false,
    className: "",
  },
) {
  const {
    type,
    size,
    children,
    onClick,
    disabled,
    htmlType,
    isLoading,
    className,
  } = props;

  const buttonType = {
    primary: "bg-black text-white",
    secondary: "bg-gray-200 text-black",
    danger: "bg-red-500 text-white",
    transparent: "bg-transparent text-black",
  }[type];

  const buttonSize = {
    sm: "py-2 px-4 text-xs",
    md: "py-3 px-6 text-sm",
    lg: "py-4 px-8 text-lg",
  }[size];

  return (
    <button
      className={`${className} ${buttonType} ${buttonSize} text-white rounded-md focus:outline-none ${disabled ? "cursor-not-allowed opacity-35" : ""} ${isLoading ? "cursor-wait opacity-35" : ""} active:scale-95 transition-transform`}
      onClick={onClick}
      disabled={disabled}
      type={htmlType}
    >
      {isLoading && <LoadingIcon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
}

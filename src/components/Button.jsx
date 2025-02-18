const variants = {
  primary: "bg-brand-500 hover:bg-brand-700 focus:ring-brand-500",
  danger: "bg-rose-400 hover:bg-rose-600 focus:ring-rose-400",
};
const Button = ({ variant = "primary", children, ...props }) => {
  return (
    <button
      {...props}
      className={`w-full flex justify-center py-2.5 px-4 border rounded-sm border-transparent shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;

const HyperLink = ({ children }) => {
  return (
    <span className="text-sm font-medium text-brand-500 hover:text-brand-700 cursor-pointer">
      {children}
    </span>
  );
};

export default HyperLink;

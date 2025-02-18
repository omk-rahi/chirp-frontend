const Input = ({ label, register, error, ...props }) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="text-gray-700 text-sm font-medium block"
      >
        {label}
      </label>
      <input
        {...props}
        className="mt-1 px-4 py-2 block border border-gray-300 w-full focus:ring-2 focus:ring-brand-500 focus:outline-0"
        {...register(props.id)}
      />

      {error?.message && (
        <p className="text-sm mt-1 text-red-400">{error.message}</p>
      )}
    </div>
  );
};

export default Input;

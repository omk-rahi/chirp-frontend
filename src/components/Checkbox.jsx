const Checkbox = ({ label, id, register }) => {
  return (
    <div className="flex items-center">
      <label
        htmlFor={id}
        className="text-sm text-gray-700 flex items-center gap-2 select-none"
      >
        <input
          type="checkbox"
          id={id}
          name={id}
          className="hidden peer"
          {...register(id)}
        />
        <span
          className=" inline-block w-4 h-4 border border-gray-300 rounded-sm peer-checked:bg-brand-500 cursor-pointer peer-checked:border-0 peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-brand-500"
          aria-hidden="true"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;

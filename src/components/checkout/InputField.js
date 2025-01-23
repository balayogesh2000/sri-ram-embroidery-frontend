"use client";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  rows = 1,
  mobile = false, // Special prop for mobile validation
}) => {
  // Handle mobile-specific input behavior
  const handleChange = (e) => {
    if (mobile) {
      // Only allow numbers and restrict the length to 10
      const regex = /^[0-9]*$/;
      if (regex.test(e.target.value) && e.target.value.length <= 10) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={rows}
          className="w-full p-3 border rounded mt-1"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full p-3 border rounded mt-1"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
        />
      )}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default InputField;

const Field = ({ label, children, htmlFor, error }) => {
  return (
    <>
      {label && (
        <label htmlFor={htmlFor} className="block mb-2">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-red-600">
          {error.message}
        </div>
      )}
    </>
  );
};

export default Field;

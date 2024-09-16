export default function InputWrapper({
  error,
  children,
}) {
  return (
    <div className="flex flex-col gap-2">
      {children}
      {error && <p className="text-xs text-red-500 pl-2">{error}</p>}
    </div>
  );
}

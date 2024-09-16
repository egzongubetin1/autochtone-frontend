export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-blue-200"></div>
      <h1 className="mt-4 text-xl font-semibold">Loading</h1>
    </div>
  );
}

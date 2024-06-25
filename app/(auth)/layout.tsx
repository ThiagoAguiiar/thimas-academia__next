export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full">
      <div className="w-[80%] mx-auto h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

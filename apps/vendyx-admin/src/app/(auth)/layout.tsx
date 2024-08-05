export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid items-center h-screen">
      <div className="space-y-12">
        <h1 className="text-center text-2xl font-medium">Vendyx.io</h1>
        {children}
      </div>
    </div>
  );
}

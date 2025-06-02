export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted w-full h-screen">
      <div className="">{children}</div>
    </div>
  )
}
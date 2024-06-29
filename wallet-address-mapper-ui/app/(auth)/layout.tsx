import Header from "~/components/Header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="m-2">
        {children}
      </main>
    </>
  )
}

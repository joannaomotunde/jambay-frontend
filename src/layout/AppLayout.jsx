import BottomNav from '../components/BottomNav'

function AppLayout({ children, showNav = true }) {
  return (
    <div className="min-h-screen flex flex-col w-full">

      {/* Page Content */}
      <main className="flex-1 w-full max-w-[900px] mx-auto px-5 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && <BottomNav />}

    </div>
  )
}

export default AppLayout
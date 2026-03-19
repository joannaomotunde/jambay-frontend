import BottomNav from '../components/BottomNav'

function AppLayout({ children, showNav = true }) {

  return (
    <div className="min-h-screen flex flex-col w-full">

      {/* Page Content */}
      <div className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-6">
        {children}
      </div>

      {/* Bottom Navigation */}
      {showNav && <BottomNav />}

    </div>
  )
}

export default AppLayout
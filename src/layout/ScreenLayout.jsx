function ScreenLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a9e8f] via-[#4ECDC4] to-white flex justify-center">
      
      {/* App container */}
      <div className="w-full max-w-[420px] min-h-screen flex flex-col p-6 mx-auto">
        {children}
      </div>
    </div>
  )
}

export default ScreenLayout
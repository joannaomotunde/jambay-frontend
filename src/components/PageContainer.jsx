function PageContainer({ children }) {
  return (
    <div
      style={{
        width: "100%",          // full width
        maxWidth: "480px",      // matches your mobile design
        margin: "0 auto",       // center on wider screens
        padding: "0 16px",      // horizontal padding
        flex: 1,                // take full height inside parent flex
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {children}
    </div>
  );
}

export default PageContainer;
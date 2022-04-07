const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center py-2 text-slate-400">
      <p>Copyright {year}</p>
    </footer>
  );
};

export default Footer;

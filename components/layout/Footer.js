export default function Footer() {
  return (
    <footer className="text-center py-6 px-6 text-[0.75rem] text-muted tracking-[0.04em] border-t border-black/[0.06]">
      © {new Date().getFullYear()} Avio. All rights reserved.
    </footer>
  );
}

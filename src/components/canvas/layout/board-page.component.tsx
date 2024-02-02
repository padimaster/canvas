export default function CanvasPage({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="w-screen h-screen">{children}</main>;
}

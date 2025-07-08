import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

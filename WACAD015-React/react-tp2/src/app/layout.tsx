import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import BootstrapClient from "./components/BootstrapClient";
import { ReactQueryClientProvider } from "./components/ReactQueryClient";
import ToastMensagem from "./components/ToastContainer/ToastContainer";

export const metadata: Metadata = {
  title: "Loja 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryClientProvider>
          <Navbar />
          {children}
          <BootstrapClient />
          <ToastMensagem />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}

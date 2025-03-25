import { CartContextProvider } from "@/contexts/CartContext";
import "./globals.css";
import ClientProviders from "./ClientProviders";

export const metadata = {
  title: "Sri Ram Embroidery",
  description: "Handcrafted Embroidered Handbags",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <ClientProviders />
        <CartContextProvider>{children}</CartContextProvider>
      </body>
    </html>
  );
}

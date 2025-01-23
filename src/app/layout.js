import { CartContextProvider } from "@/contexts/CartContext";
import "./globals.css";

export const metadata = {
  title: "Gandhiram Embroidery",
  description: "Handcrafted Embroidered Handbags",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <CartContextProvider>{children}</CartContextProvider>
      </body>
    </html>
  );
}

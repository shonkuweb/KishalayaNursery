import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Kishaloy Nursery",
  description: "Mobile-first nursery storefront homepage"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

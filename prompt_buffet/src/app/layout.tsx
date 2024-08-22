import "./globals.css";
import { KumaRegistry } from "@kuma-ui/next-plugin/registry";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AuthProvider>
          <KumaRegistry>{children}</KumaRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}

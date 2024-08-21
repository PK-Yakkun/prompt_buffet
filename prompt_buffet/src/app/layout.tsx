import { KumaRegistry } from "@kuma-ui/next-plugin/registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <KumaRegistry>{children}</KumaRegistry>
      </body>
    </html>
  );
}

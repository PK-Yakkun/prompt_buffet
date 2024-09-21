import '../styles/globals.css';

export const metadata = {
  title: 'Prompt Buffet',
  description: '画像生成用のプロンプトを簡単に構成・コピーできます。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>{children}</body>
    </html>
  );
}

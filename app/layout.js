export const metadata = {
  title: 'PetControl Pro - Controle de Medicamentos Veterinários',
  description: 'Sistema completo para controle de medicamentos dos seus pets com IA',
  manifest: '/manifest.json',
  themeColor: '#2563EB'
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563EB" />
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                  .then(reg => console.log('SW registrado:', reg.scope))
                  .catch(err => console.log('Erro SW:', err));
              });
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
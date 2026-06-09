import './globals.css'

export const metadata = {
  title: "Tom Riddle's Test — Death Eater Trivia",
  description: 'Prove your worth to the Dark Lord. A Harry Potter trivia challenge.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

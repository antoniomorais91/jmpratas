import GlobalState, { GlobalStateType } from '@/context'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JM Pratas',
  description: 'O loko das pratas!!!',
}

export default function RootLayout({ children }: GlobalStateType) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <GlobalState>
          <Navbar/>
          <main className='flex min-h-screen flex-col mt-[80px]'>{children}</main>
        </GlobalState>
      </body>
    </html>
  )
}

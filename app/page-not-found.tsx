import Link from "next/link";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page does not exist',
}
export default function NotFound() {
  return (
    <main className="flex h-[100vh] flex-col justify-center items-center">
      <i className="ri-folder-warning-fill ri-3x"></i>
      <p className="text-xl">This page does not exist</p>
      <Link href="/" className="bg-black text-white w-[100px] h-[35px] rounded-[50px] flex justify-center items-center mt-6">Back</Link>
    </main>
  )
}
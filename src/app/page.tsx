import { cookies } from "next/headers"
import { Home as HomeLayout } from "@/layouts/Home"

const getData = () => {
  const cookieStore = cookies();
  cookieStore.getAll().map((cookie) => {
    console.log(`Name: ${cookie.name}, Value: ${cookie.value}`)
  })
}

export default function Home() {
  getData();
  return <HomeLayout />
}

// import Image from 'next/image'
// import styles from './page.module.css'
"use client"

import { useGlobalContext } from './Context/store'
import App from './_app'
import "./page.module.css"
import 'bootstrap/dist/css/bootstrap.css'
// THIS IS THE UI FOR THE '/' URL
// creating folders creates a route from '/'
// '/' -> 'login' = '/login'

export default function Home() {
  const { currentUser, setCurrentUser} = useGlobalContext()

  return (

    <App/>

  )
}

import React from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = (prop:Props) => {
  return (
    <>
      <Navigation/>
      <main>{prop.children}</main>
      <Footer/>
    </>
  )
}

export default Layout
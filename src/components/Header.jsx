import React, { useEffect, useRef } from 'react'
import 'boxicons'

import {Link, useLocation} from 'react-router-dom'

import logo from '../assets/images/Logo-2.png'


const mainNav = [
  {
    display: 'Trang chủ',
    path: "/"
  },
  {
    display: 'Sản phẩm',
    path:"/catalog"
  },
  {
    display: 'Phụ kiện',
    path: "/accessories"
  },
  {
    display: "Liên hệ",
    path: "/contact"
  }
]

const Header = () => {

  const { pathname } = useLocation()
  const activeNav = mainNav.findIndex(e => e.path === pathname)

  const headerRef = useRef(null)

  useEffect(() => {
      window.addEventListener("scroll", () => {
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          headerRef.current.classList.add('shrink')
        } else {
          headerRef.current.classList.remove('shrink')
        }
      })

      return () => {
          window.removeEventListener("scroll")
      };
  }, [])

  const menuLeft = useRef(null)

  const menuToggle = () => menuLeft.current.classList.toggle('active')

  return (
    <div className='header' ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link>
            <img src={logo} alt=""></img>
          </Link>
        </div>

        <div className="header__menu">

          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i><box-icon name='menu-alt-left'></box-icon></i>
          </div>

          <div className="header__menu__left" ref={menuLeft}>

              <div className="header__menu__left__close" onClick={menuToggle}>
                <i><box-icon name='chevron-left' ></box-icon></i>
              </div>

              {
                mainNav.map((item, index) => (
                  <div 
                      key={index} 
                      className={`header__menu__item 
                      header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                      onClick={menuToggle}
                  >
                    <Link to={item.path}>
                        <span>{item.display}</span>
                    </Link>
                  </div>
                ))
              }

          </div>


          <div className="header__menu__right">
              <div className="header__menu__item header__menu__right__item">
                <i><box-icon name='search-alt-2'></box-icon></i>
              </div>

              <div className="header__menu__item header__menu__right__item">
                <Link to="/cart">
                    <i><box-icon type='solid' name='cart'></box-icon></i>
                </Link>
              </div>

              <div className="header__menu__item header__menu__right__item">
                <i><box-icon name='user'></box-icon></i>
              </div>
              
          </div>

        </div>
      </div>
    </div>
  )
}

export default Header

import React from 'react'

//search for bootstrap 5 navbar on google - in link search for dark navbar
//then search the brand name        
const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-dark'>
                <a class="navbar-brand" 
                    href="https://javaspringhibernate.com/core-java-training">
                        Employee Management System
                </a>
            </nav>
        </header>
    </div>
    
  )
}

export default HeaderComponent
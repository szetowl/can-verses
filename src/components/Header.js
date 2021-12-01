import React from 'react'
import './Header.css'
import Menu from '@mui/icons-material/Menu';

const Header = (props) =>  {
    return (
        <div className='header'>
            <Menu />
            <h2>{props.Title}</h2>
          

        </div>
    )
}

export default Header

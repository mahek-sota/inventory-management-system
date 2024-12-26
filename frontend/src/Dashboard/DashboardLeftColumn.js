import React from 'react';
import './dashboard.css'


function DashboardLeftColumn({ activeItem, onItemClick }) {
    return (
      <div className='dashboard-left-column'>
        <ul>
          <li className={activeItem === 1 ? 'active' : ''} onClick={() => onItemClick(1)}>Home</li>
          <li className={activeItem === 2 ? 'active' : ''} onClick={() => onItemClick(2)}>Item</li>
          <li className={activeItem === 3 ? 'active' : ''} onClick={() => onItemClick(3)}>Stock</li>
          <li className={activeItem === 4 ? 'active' : ''} onClick={() => onItemClick(4)}>Build</li>
          <li className={activeItem === 5 ? 'active' : ''} onClick={() => onItemClick(5)}>Customers</li>
          <li className={activeItem === 6 ? 'active' : ''} onClick={() => onItemClick(6)}>Sales Orders</li>
          <li className={activeItem === 7 ? 'active' : ''} onClick={() => onItemClick(7)}>Suppliers</li>
          <li className={activeItem === 8 ? 'active' : ''} onClick={() => onItemClick(8)}>Manufacturers</li>
          <li className={activeItem === 9 ? 'active' : ''} onClick={() => onItemClick(9)}>Purchase orders</li>
          <li className={activeItem === 10 ? 'active' : ''} onClick={() => onItemClick(10)}>Reports</li>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          

          <li className={activeItem === 11 ? 'active' : ''} onClick={() => onItemClick(11)}>Help</li>
          <li className={activeItem === 12 ? 'active' : ''} onClick={() => onItemClick(12)}>Integrations</li>
          <li className={activeItem === 13 ? 'active' : ''} onClick={() => onItemClick(13)}>Logout</li>
          <li className={activeItem === 14 ? 'active' : ''} onClick={() => onItemClick(14)}>My Profile</li>

        </ul>
      </div>
    );
  }

  export default DashboardLeftColumn


  
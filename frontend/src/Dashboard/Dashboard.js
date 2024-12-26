import React, { useState } from 'react';
import DashboardLeftColumn from './DashboardLeftColumn';
import './dashboard.css'
import ItemDashboard from './ItemDashboard';

function Dashboard() {
  const [activeItem, setActiveItem] = useState(1); // State to track active item

  const handleItemClick = (itemIndex) => {
    setActiveItem(itemIndex); // Update active item when clicked
  };

  return (
    <div className="dashboard-container">
      <DashboardLeftColumn activeItem={activeItem} onItemClick={handleItemClick} />
      <ItemDashboard />
    </div>
  );
}

export default Dashboard;

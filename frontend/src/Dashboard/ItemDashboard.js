import React, { useState, useEffect } from 'react';

const ItemDashboard = () => {
  const [counts, setCounts] = useState({});
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedByName, setSortedByName] = useState(false);
  const [originalTableData, setOriginalTableData] = useState([]);
  const [newRowData, setNewRowData] = useState({
    sku: '',
    name: '',
    tags: '',
    category: '',
    in_stock: '',
    available_stock: ''
  });

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortItemsByName = () => {
    if (sortedByName) {
      setTableData(originalTableData);
      setSortedByName(false);
    } else {
      const sortedItems = [...tableData].sort((a, b) => a.name.localeCompare(b.name));
      setTableData(sortedItems);
      setSortedByName(true);
    }
  };

  const handleAddRow = () => {
    setTableData([...tableData, newRowData]);
    setOriginalTableData([...originalTableData, newRowData]);
    setFilteredData([...filteredData, newRowData]);
    setNewRowData({
      sku: '',
      name: '',
      tags: '',
      category: '',
      in_stock: '',
      available_stock: ''
    });
    // Send a request to backend to save the new row data
    saveNewRowData(newRowData);
  };

  const saveNewRowData = async (rowData) => {
    try {
      const response = await fetch('http://localhost:8000/api/djangoApp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rowData)
      });
      if (!response.ok) {
        throw new Error('Failed to save new row data');
      }
      // Handle successful response
      console.log('New row data saved successfully:', rowData);
    } catch (error) {
      console.error('Error saving new row data:', error);
    }
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/djangoApp/count/');
        if (!response.ok) {
          throw new Error('Failed to fetch counts');
        }
        const data = await response.json();
        setCounts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    const fetchTableData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/djangoApp/');
        if (!response.ok) {
          throw new Error('Failed to fetch table data');
        }
        const data = await response.json();
        setTableData(data);
        setOriginalTableData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchCounts();
    fetchTableData();
  }, []);

  useEffect(() => {
    const filteredItems = originalTableData.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredItems);
    if (sortedByName) {
      const sortedItems = [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
      setFilteredData(sortedItems);
    }
  }, [searchQuery, originalTableData, sortedByName]);

  return (
    <>
      <div className='flexContainer'>
        <div>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleChange}
          />
          <button onClick={sortItemsByName}>
            {sortedByName ? 'Unsort' : 'Sort by Name'}
          </button>
          <p>Total Count of Unique Categories: {counts.unique_categories_count}</p>
          <p>Total Count of Rows in the Table: {counts.total_rows_count}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Tags</th>
              <th>Category</th>
              <th>In Stock</th>
              <th>Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.sku}</td>
                <td>{row.name}</td>
                <td>{row.tags}</td>
                <td>{row.category}</td>
                <td>{row.in_stock}</td>
                <td>{row.available_stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Add New Row</h2>
        <input
          type="text"
          placeholder="SKU"
          value={newRowData.sku}
          onChange={(e) => setNewRowData({ ...newRowData, sku: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={newRowData.name}
          onChange={(e) => setNewRowData({ ...newRowData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tags"
          value={newRowData.tags}
          onChange={(e) => setNewRowData({ ...newRowData, tags: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newRowData.category}
          onChange={(e) => setNewRowData({ ...newRowData, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="In Stock"
          value={newRowData.in_stock}
          onChange={(e) => setNewRowData({ ...newRowData, in_stock: e.target.value })}
        />
        <input
          type="text"
          placeholder="Available Stock"
          value={newRowData.available_stock}
          onChange={(e) => setNewRowData({ ...newRowData, available_stock: e.target.value })}
        />
        <button onClick={handleAddRow}>Add Row</button>
      </div>
    </>
  );
};

export default ItemDashboard;

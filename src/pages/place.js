import React, { useState } from 'react';
import {
  Route
} from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

import Create from '../pages/place/Create'
import Edit from '../pages/place/Edit'
import ListCalendar from '../pages/place/ListCalendar'

function Dashboard(props) {
  // let history = useHistory();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [editData, setEditData] = useState('');
  const editset = (data, id) => {
    console.log(id)
    setEditId(id);
    setEditData(data);
  }
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div>
          <Route path="/place/">
            <ListCalendar setEditId={editset} />
          </Route>
          <Route path="/place/Create">
            <Create />
          </Route>
          <Route path="/place/Edit">
            <Edit id={editId} data={editData} />
          </Route>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
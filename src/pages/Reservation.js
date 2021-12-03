import React, { useState } from 'react';
import {
  Route
} from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

import Create from './reservation/Create'
import Edit from './reservation/Edit'
import ListCalendar from './reservation/ListCalendar'

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
          <Route  path="/Reservation/">
            <ListCalendar setEditId={editset}/>
          </Route>
          <Route  path="/Reservation/Create">
            <Create/>
          </Route>
          <Route  path="/Reservation/Edit">
            <Edit id={editId} data={editData}/>
          </Route>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
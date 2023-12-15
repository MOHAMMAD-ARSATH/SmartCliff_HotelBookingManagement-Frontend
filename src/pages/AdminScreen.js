import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

import AdminBookingScreen from "../components/BookingTable";
import AdminRoomScreen from "../components/RoomTable";
import AdminUserScreen from "../components/UserTable";
import AdminAddRoomScreen from "../components/AddRoom";
import Navbar2 from "../components/AdminNav";
import ContactTable from "../components/ContactTable";

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
function AdminScreen() {


  return (
    <div>
      <Navbar2/>
      <div className="ml-3 mt-3 mr-3 bs">
      <h1 className="text-center">Admin Panel</h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Booking Details" key="1">
          <AdminBookingScreen></AdminBookingScreen>
        </TabPane>
        <TabPane tab="Room Details" key="2">
          <AdminRoomScreen></AdminRoomScreen>
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <AdminAddRoomScreen></AdminAddRoomScreen>
        </TabPane>
        <TabPane tab="User Details" key="4">
          <AdminUserScreen></AdminUserScreen>
        </TabPane>
        <TabPane tab="Contact Details" key="5">
          <ContactTable></ContactTable>
        </TabPane>
      </Tabs>
    </div>
    </div>
  );
}

export default AdminScreen;


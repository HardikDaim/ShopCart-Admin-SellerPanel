import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import { socket } from '../utils/utils';
import { useDispatch, useSelector } from "react-redux";
import { updateCustomers, updateSellers } from "../store/reducers/chatReducer";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector( state => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);

  // useEffect(() => {
  //   if(userInfo && userInfo?.role === 'seller') {
  //     socket.emit('add_seller', userInfo?._id, userInfo);
  //   } else {
  //     socket.emit('add_admin', userInfo)
  //   }
  // },[userInfo])

  // useEffect(() => {
  //   socket.on('activeCustomer', (customers) => {
  //     dispatch(updateCustomers(customers));
  //   })
  //   socket.on('activeSeller', (sellers) => {
  //     dispatch(updateSellers(sellers));
  //   })
  // })

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="w-full min-h-screen ">
        <Header showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <div className="ml-0 lg:ml-[260px] pt-[80px] transition-all">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;

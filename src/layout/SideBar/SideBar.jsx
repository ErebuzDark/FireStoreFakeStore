import React, { useContext, useEffect } from 'react';
import { Context } from '@contexts/ContextProvider';
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { CiShoppingCart, CiHome, CiLogout  } from "react-icons/ci";

// services
import { getCartsItem } from '@services/cartService';

// base url ngaaa
import { API } from '@config/apiConfig';

const SideBar = () => {
  const {cartCount, setCartCount} = useContext(Context);

  useEffect(() => {
    const fetchCart = async () => {
      const carts = await getCartsItem();
      setCartCount(carts.length);
    };

    fetchCart();
  }, []);

  return (
    <div className='hidden md:block w-72 min-h-[calc(100vh-103px)] bg-white shadow'>
      <Sidebar aria-label="Default sidebar example">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem href="/" icon={CiHome}>
              Home
            </SidebarItem>
            <SidebarItem href="/cart" icon={CiShoppingCart} label={cartCount} labelColor="dark">
              Cart
            </SidebarItem>
            <SidebarItem href="#" icon={CiLogout}>
              Sign Out
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
}

export default SideBar;

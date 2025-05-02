import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "@contexts/ContextProvider";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { CiShoppingCart, CiHome, CiLogout } from "react-icons/ci";

// services
import { getCartsItem } from "@services/cartService";

// base url ngaaa
import { API } from "@config/apiConfig";

const SideBar = () => {
  const { cartCount, setCartCount } = useContext(Context);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const fetchCart = async () => {
      const carts = await getCartsItem();
      setCartCount(carts.length);
    };

    fetchCart();
  }, []);

  return (
    <div className="hidden md:block w-72 min-h-[calc(100vh-103px)] bg-white shadow">
      <Sidebar aria-label="Default sidebar example">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem href="/" icon={CiHome} active={currentPath === "/"}>
              Home
            </SidebarItem>

            <SidebarItem
              href="/cart"
              icon={CiShoppingCart}
              label={cartCount}
              labelColor="dark"
              active={currentPath === "/cart"}
            >
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
};

export default SideBar;

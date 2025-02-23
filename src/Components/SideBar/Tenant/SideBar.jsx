/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import nspg_logo from "../../../assets/logo/nspg_logo.png";
import dashboardIcon from "../../../assets/icons/sidebar icons/DashboardIcon.svg";
import numberCruncherIcon from "../../../assets/icons/sidebar icons/NumberCruncherIcon.svg";
import priceGuideIcon from "../../../assets/icons/sidebar icons/PriceGuideIcon.svg";
import crmIcon from "../../../assets/icons/sidebar icons/CRM-Icon.svg";
import reportingIcon from "../../../assets/icons/sidebar icons/ReportingIcon.svg";
import markeitngIcon from "../../../assets/icons/sidebar icons/MarketingIcon.svg";
import dispatchIcon from "../../../assets/icons/sidebar icons/DispatchAppIcon.svg";
import techinicanIcon from "../../../assets/icons/sidebar icons/TechniciansIcon.svg";
import jobHistoryIcon from "../../../assets/icons/sidebar icons/JobHistoryIcon.svg";
import invoiceIcon from "../../../assets/icons/sidebar icons/InvoiceIcon.svg";
import chatIcon from "../../../assets/icons/sidebar icons/ChatIcon.svg";
import logoutIcon from "../../../assets/icons/sidebar icons/LogoutIcon.svg";
import taxBenefitIcon from "../../../assets/icons/sidebar icons/TaxBenefitsIcon.svg";
import employeeTaxBenIcon from "../../../assets/icons/sidebar icons/EmployeesIcon.svg";
import budgetIcon from "../../../assets/icons/sidebar icons/BudgetIcon.svg";
import analyzeIcon from "../../../assets/icons/sidebar icons/AnalyzeIcon.svg";
import jobDetail from "../../../assets/icons/sidebar icons/JobDetailsIcon.svg";
import fileIcon from "../../../assets/icons/sidebar icons/FileIcon.svg";

import { useDispatch, useSelector } from "react-redux";
import { setUserLogout } from "../../../slices/authSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isPriceGuideActive, setIsPriceGuideActive] = useState(false);
  const [isNumberCruncherActive, setIsNumberCruncherActive] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/tenant/login");
    dispatch(setUserLogout());
  };

  const defaultMenuItems = [
    {
      key: 1,
      label: "Dashboard",
      logo: dashboardIcon,
      onClick: () => {
        setIsPriceGuideActive(false);
        setIsNumberCruncherActive(false);
        setSelectedMenuItem(1);
        sessionStorage.setItem("selectedMenuItem", 1);
        navigate("/setup");
      },
    },
    {
      key: 2,
      label: "Number Cruncher",
      logo: numberCruncherIcon,
      onClick: () => {
        setSelectedMenuItem(1);
        sessionStorage.setItem("selectedMenuItem", 1);
        window.open("/tenant/numbercruncher/setup", "_blank");
      },
    },
    {
      key: 3,
      label: "Price Guide App",
      logo: priceGuideIcon,
      onClick: () => {
        setIsPriceGuideActive(true);
        setIsNumberCruncherActive(false);
        setSelectedMenuItem(2);
        sessionStorage.setItem("selectedMenuItem", 3);
        navigate("/tenant/price-guide/setup");
      },
    },

    {
      key: 4,
      label: "Price Guide Manager",
      logo: priceGuideIcon,
      onClick: () => {
        setIsPriceGuideActive(true);
        setIsNumberCruncherActive(false);
        setSelectedMenuItem(2);
        sessionStorage.setItem("selectedMenuItem", 4);
        navigate("/tenant/price-guide-manager/setup");
      },
    },
    {
      key: 5,
      label: "CRM",
      logo: crmIcon,
      onClick: () => {
        setIsPriceGuideActive(false);
        setIsNumberCruncherActive(false);
        setSelectedMenuItem(2);
        sessionStorage.setItem("selectedMenuItem", 5);
        navigate("/tenant/price-guide-manager/setup");
      },
    },
    {
      key: 6,
      label: "Reporting",
      logo: reportingIcon,
      onClick: () => {
        setIsPriceGuideActive(false);
        setIsNumberCruncherActive(false);
        setSelectedMenuItem(2);
        sessionStorage.setItem("selectedMenuItem", 6);
        navigate("/tenant/price-guide-manager/setup");
      },
    },
    {
      key: 7,
      label: "Marketing",
      logo: markeitngIcon,
      onClick: () => {
        setIsPriceGuideActive(false);
        setIsNumberCruncherActive(false);
        setSelectedMenuItem(2);
        sessionStorage.setItem("selectedMenuItem", 7);
        navigate("/tenant/price-guide-manager/setup");
      },
    },
    {
      key: 8,
      label: "Dispatch App",
      logo: dispatchIcon,
      onClick: () => {
        setIsPriceGuideActive(false);
        setIsNumberCruncherActive(false);
        setSelectedMenuItem(2);
        sessionStorage.setItem("selectedMenuItem", 8);
        navigate("/tenant/price-guide-manager/setup");
      },
    },
    {
      key: 9,
      label: "Technicians",
      logo: techinicanIcon,
      onClick: () => {
        setIsPriceGuideActive(false);
        setIsNumberCruncherActive(false);
        setSelectedMenuItem(6);
        sessionStorage.setItem("selectedMenuItem", 9);
        navigate("/tenant/technicians");
      },
    },
    {
      key: 10,
      label: "Job History",
      logo: jobHistoryIcon,
      onClick: () => {
        setIsPriceGuideActive(false);
        setIsNumberCruncherActive(false);
        setSelectedMenuItem(5);
        sessionStorage.setItem("selectedMenuItem", 10);
        navigate("/print");
        setIsNumberCruncherActive(false);
        navigate("/tenant/job-history");
      },
    },
    {
      key: 11,
      label: "Invoice",
      logo: invoiceIcon,
      onClick: () => {
        setIsPriceGuideActive(false);
        setIsNumberCruncherActive(false);
        setSelectedMenuItem(2);
        sessionStorage.setItem("selectedMenuItem", 11);
        navigate("/tenant/price-guide-manager/setup");
      },
    },

    {
      key: 12,
      label: "Chat",
      logo: chatIcon,
      onClick: () => {
        setIsPriceGuideActive(false);
        setIsNumberCruncherActive(false);
        setSelectedMenuItem(7);
        sessionStorage.setItem("selectedMenuItem", 12);
        navigate("/file");
        setIsNumberCruncherActive(false);
        navigate("/tenant/chat");
      },
    },
    { key: 13, label: "Logout", onClick: handleLogout },
  ];

  const priceGuideMenuItems = [
    {
      key: 1,
      label: "Setup",
      onClick: () => {
        setSelectedMenuItem(1);
        sessionStorage.setItem("selectedMenuItem", 1);
        navigate("/tenant/price-guide/setup");
      },
    },
    {
      key: 2,
      label: "Parts",
      onClick: () => {
        setSelectedMenuItem(2);
        sessionStorage.setItem("selectedMenuItem", 2);
        navigate("/tenant/price-guide/parts");
      },
    },
    {
      key: 3,
      label: "Tasks",
      onClick: () => {
        setSelectedMenuItem(3);
        sessionStorage.setItem("selectedMenuItem", 3);
        navigate("/tenant/price-guide/tasks");
      },
    },
    {
      key: 4,
      label: "Design",
      onClick: () => {
        setSelectedMenuItem(4);
        sessionStorage.setItem("selectedMenuItem", 4);
        navigate("/tenant/price-guide/design");
      },
    },
    {
      key: 5,
      label: "Print",
      onClick: () => {
        setSelectedMenuItem(5);
        sessionStorage.setItem("selectedMenuItem", 5);
        navigate("/tenant/price-guide/print");
      },
    },
    {
      key: 6,
      label: "File",
      onClick: () => {
        setSelectedMenuItem(6);
        sessionStorage.setItem("selectedMenuItem", 6);
        navigate("/tenant/price-guide/file");
      },
    },
    {
      key: 7,
      label: "Web App",
      onClick: () => {
        setSelectedMenuItem(7);
        sessionStorage.setItem("selectedMenuItem", 7);
        navigate("/tenant/price-guide/web-app");
      },
    },
    {
      key: 8,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const numberCruncherMenuItems = [
    {
      key: 1,
      label: "Setup",
      logo: numberCruncherIcon,
      onClick: () => {
        setSelectedMenuItem(1);
        sessionStorage.setItem("selectedMenuItem", 1);
        navigate("/tenant/numbercruncher/setup");
      },
    },
    {
      key: 2,
      label: "Tax/Benefit",
      logo: taxBenefitIcon,
      onClick: () => {
        setSelectedMenuItem(2);
        sessionStorage.setItem("selectedMenuItem", 2);
        navigate("/tenant/numbercruncher/tax-benifit");
      },
    },
    {
      key: 3,
      label: "Employees",
      logo: employeeTaxBenIcon,
      onClick: () => {
        setSelectedMenuItem(3);
        sessionStorage.setItem("selectedMenuItem", 3);
        navigate("/tenant/numbercruncher/employees");
      },
    },
    {
      key: 4,
      label: "Budget",
      logo: budgetIcon,
      onClick: () => {
        setSelectedMenuItem(4);
        sessionStorage.setItem("selectedMenuItem", 4);
        navigate("/tenant/numbercruncher/budget");
      },
    },
    {
      key: 5,
      label: "Analyze",
      logo: analyzeIcon,
      onClick: () => {
        setSelectedMenuItem(5);
        sessionStorage.setItem("selectedMenuItem", 5);
        navigate("/tenant/numbercruncher/analyze");
      },
    },
    {
      key: 6,
      label: "Job Details",
      logo: jobDetail,
      onClick: () => {
        setSelectedMenuItem(6);
        sessionStorage.setItem("selectedMenuItem", 6);
        navigate("/tenant/numbercruncher/job-detail");
      },
    },
    {
      key: 7,
      label: "File",
      logo: fileIcon,
      onClick: () => {
        setSelectedMenuItem(7);
        sessionStorage.setItem("selectedMenuItem", 7);
        navigate("/tenant/numbercruncher/web-app");
      },
    },
    {
      key: 8,
      label: "Logout",
      logo: logoutIcon,
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    // Keep price guide menu active only if on a specific /tenant/ path
    if (currentPath.startsWith("/tenant/price-guide") && currentPath !== "/tenant/dashboard") {
      setIsPriceGuideActive(true);
      setIsNumberCruncherActive(false);
    } else if (currentPath.startsWith("/tenant/numbercruncher") && currentPath !== "/tenant/dashboard") {
      setIsPriceGuideActive(false);
      setIsNumberCruncherActive(true);
    } else {
      setIsPriceGuideActive(false);
      setIsNumberCruncherActive(false);
    }

    const storedMenuItem = sessionStorage.getItem("selectedMenuItem");
    if (storedMenuItem) {
      setSelectedMenuItem(Number(storedMenuItem));
    }
  }, [location.pathname]);

  // Determine which menu items to show based on the active state
  const menuItems = isPriceGuideActive
    ? priceGuideMenuItems
    : isNumberCruncherActive
    ? numberCruncherMenuItems
    : defaultMenuItems;

  return (
    <aside className="w-60 min-h-screen flex flex-col">
      {" "}
      {/* Logo */}
      <div className="flex items-center h-20 pl-4 mt-5 mb-2">
        <img src={nspg_logo} alt="NSPG Logo" width={130} />
      </div>
      {/* Scrollable Menu Items */}
      <div className="overflow-y-auto">
        <ul className="px-5">
          {menuItems.map(({ key, label, onClick, logo }) => (
            <li
              key={key}
              className={`flex w-full items-center h-[42px] pl-3 mb-1 text-[#344054] font-medium rounded-[12px] cursor-pointer ${
                selectedMenuItem === key
                  ? "bg-white border-2 !text-[#222222] !font-bold shadow-sm"
                  : "hover:bg-gray-200"
              }`}
              onClick={onClick}
            >
              {logo && <img src={logo} alt={`${label} logo`} className="w-4 h-4 mr-3" />} {/* Add logo here */}
              <span className="mr-2 text-md">{label}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Footer/Profile */}
      <div className="p-3 mb-6 mt-[60px]">
        <div className="flex items-center gap-3 bg-white border-2 !text-[#222222] !font-bold shadow-sm rounded-[18px] p-2">
          {" "}
          {/* Adjusted padding */}
          <div className="w-8 h-8 rounded-full bg-gray-400 flex justify-center items-center text-white font-semibold overflow-hidden">
            {" "}
            {user?.name?.slice(0, 1)?.toUpperCase()}
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#344054]">{user?.name}</p>
            <p className="text-[14px] font-medium text-[#344054]">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

/** @format */

// TENANT PATH
import TenantDashboard from "../pages/Tenants/Dashboard";
import TenantForgotPassword from "../pages/Tenants/ForgotPassword";
import TenantLogin from "../pages/Tenants/Login";
import TenantResetPassword from "../pages/Tenants/ResetPassword";
import GeneralSetup from "../pages/Tenants/Price Guide/Setup";
import GeneralParts from "../pages/Tenants/Price Guide/Parts";
import TenantSignUp from "../pages/Tenants/SignUp";
import Technicians from "../pages/Tenants/Technicians";
import NumberCruncherSetup from "../pages/Tenants/NumberCruncher/Setup";
import NumberCruncherTaxBenifit from "../pages/Tenants/NumberCruncher/TaxBenifit";
import NumberCruncherEmployees from "../pages/Tenants/NumberCruncher/Employees";
import NumberCruncherBudget from "../pages/Tenants/NumberCruncher/Budget";
import JobHistory from "../pages/Tenants/JobHistory";
import Chat from "../pages/Tenants/Chat";
import NumberCruncherJobDetails from "../pages/Tenants/NumberCruncher/JobDetail";
import NumberCruncherAnalyze from "../pages/Tenants/NumberCruncher/Analyze";


// PUBLIC PATH TENANT ONLY
export const TENANT_REGISTER_PATH = "/tenant/register";
export const TENANT_LOGIN_PATH = "/tenant/login";
export const TENANT_RESET_PASSWORD_PATH = "/tenant/reset-password";
export const TENANT_FORGOT_PASSWORD_PATH = "/tenant/forgot-password";

// PRIVATE PATH FOR TENANT
export const TENANT_DASHBOARD_PATH = "/tenant/dashboard";
export const TENANT_TECHNICIANS_PATH = "/tenant/technicians";
export const TENANT_EMPLOYEE_PATH = "/tenant/employee";
export const TENANT_SETUPPRICEGUIDE_PATH = "/tenant/price-guide/setup";
export const TENANT_PARTSPRICEGUIDE_PATH = "/tenant/price-guide/parts";
export const TENANT_SETUPNUMBERCRUNCHER_PATH = "/tenant/numbercruncher/setup";
export const TENANT_TAXBENIFITNUMBERCRUNCHER_PATH = "/tenant/numbercruncher/tax-benifit";
export const TENANT_EMPLOYEESNUMBERCRUNCHER_PATH = "/tenant/numbercruncher/employees";
export const TENANT_BUDGETNUMBERCRUNCHER_PATH = "/tenant/numbercruncher/budget";
export const TENANT_JOB_HISTORY = "/tenant/job-history";
export const TENANT_CHAT = "/tenant/chat";
export const TENANT_JOBDETAILSNUMBERCRUNCHER_PATH = "/tenant/numbercruncher/job-detail";
export const TENANT_ANALYZENUMBERCRUNCHER_PATH = "/tenant/numbercruncher/analyze";






// TENANT PUBLIC ROUTES
export const TENANT_PUBLIC_ROUTE = [
  { id: "pub-1", path: TENANT_LOGIN_PATH, Component: TenantLogin },
  { id: "pub-2", path: TENANT_REGISTER_PATH, Component: TenantSignUp },
  {
    id: "pub-3",
    path: TENANT_RESET_PASSWORD_PATH,
    Component: TenantResetPassword,
  },
  {
    id: "pub-4",
    path: TENANT_FORGOT_PASSWORD_PATH,
    Component: TenantForgotPassword,
  },
];

// PRIVATE TENANT ROUTES
export const PRIVATE_TENANT_ROUTE = [
  {
    id: TENANT_DASHBOARD_PATH,
    path: TENANT_DASHBOARD_PATH,
    Component: TenantDashboard,
  },
  {
    id: TENANT_TECHNICIANS_PATH,
    path: TENANT_TECHNICIANS_PATH,
    Component: Technicians,
  },
  {
    id: TENANT_SETUPPRICEGUIDE_PATH,
    path: TENANT_SETUPPRICEGUIDE_PATH,
    Component: GeneralSetup,
  },
  {
    id: TENANT_PARTSPRICEGUIDE_PATH,
    path: TENANT_PARTSPRICEGUIDE_PATH,
    Component: GeneralParts,
  },
  {
    id: TENANT_SETUPNUMBERCRUNCHER_PATH,
    path: TENANT_SETUPNUMBERCRUNCHER_PATH,
    Component: NumberCruncherSetup,
  },
  {
    id: TENANT_TAXBENIFITNUMBERCRUNCHER_PATH,

    path: TENANT_TAXBENIFITNUMBERCRUNCHER_PATH,

    Component: NumberCruncherTaxBenifit,
  },
  {
    id: TENANT_EMPLOYEESNUMBERCRUNCHER_PATH,
    path: TENANT_EMPLOYEESNUMBERCRUNCHER_PATH,
    Component: NumberCruncherEmployees,
  },
  {
    id: TENANT_JOBDETAILSNUMBERCRUNCHER_PATH,
    path: TENANT_JOBDETAILSNUMBERCRUNCHER_PATH,
    Component: NumberCruncherJobDetails,
  },

  {
    id: TENANT_ANALYZENUMBERCRUNCHER_PATH,
    path: TENANT_ANALYZENUMBERCRUNCHER_PATH,
    Component: NumberCruncherAnalyze,
  },

  {
    id: TENANT_BUDGETNUMBERCRUNCHER_PATH,
    path: TENANT_BUDGETNUMBERCRUNCHER_PATH,
    Component: NumberCruncherBudget,
  },
  {
    id: TENANT_JOB_HISTORY,
    path: TENANT_JOB_HISTORY,
    Component: JobHistory,
  },
  {
    id: TENANT_CHAT,
    path: TENANT_CHAT,
    Component: Chat,
  },
];

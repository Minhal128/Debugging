import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, notification } from "antd";
import nspgLogo from "../../assets/logo/nspg_logo.png";
import Button from "../../Components/Button/Button";
import AntdLoader from "../../Components/Loader/AntdLoader";
import { loginUser, setUser } from "../../slices/authSlice";
import { TENANT_FORGOT_PASSWORD_PATH, TENANT_REGISTER_PATH, TENANT_DASHBOARD_PATH } from "../../routes/ROUTE_CONSTANT";
import { showNotification } from "../../utils/AntdNotification";
import { TENANT_ROLE } from '../../utils/utils';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
    string: {
      min: "${label} must be at least ${min} characters!",
    },
  };

  const onSubmit = (values) => {
    console.log("Submitted Values:", values); // Log form values
    setIsLoading(true);
    // // Example async call simulation
    // setTimeout(() => {
    //   setIsLoading(false);
    //   // Mock successful login
    //   console.log("Login successful with", values);
    //   navigate("/"); 
    // }, 1000);

    // Uncomment below for Redux dispatch logic
    dispatch(loginUser({ email: values.email, password: values.password, role: TENANT_ROLE, }))
      .unwrap()
      .then((res) => {
        console.log("Login, ", res);
        // notification.success(res.message ?? "Successfully Logged In")
        showNotification("success", res.message ?? "Successfully Logged In")
        const { accessToken, refreshToken, ...rest } = res.data;
        // console.log("Login Success:", { accessToken, refreshToken, ...rest });
        localStorage.setItem("token", accessToken);
        localStorage.setItem("r", refreshToken);
        localStorage.setItem("user", JSON.stringify(rest));
        dispatch(setUser(rest));
        navigate(TENANT_DASHBOARD_PATH);
      })
      .catch((err) => {
        console.error("Login Error:", err);
        // notify("error", err.message || "Invalid Credentials");
      })
      .finally(() => setIsLoading(false));
  };


  return (
    <div className="flex min-h-screen flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-background">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10 flex flex-col justify-center items-center">
          <img src={nspgLogo} width={200} alt="NSPG Logo" />
          <h2 className="font-medium text-2xl mt-4">National Standard Price Guide</h2>
          <p className=" mb-4 text-gray-400">Complete the Login to get started</p>
          <Form
            form={form}
            validateMessages={validateMessages}
            onFinish={onSubmit}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label={<span className="text-gray-500 font-medium">Email Address</span>}
              rules={[{ required: true, type: "email" }]}
            >
              <Input
                size="large"
                placeholder="Enter your email address"
                style={{ borderRadius: "7px", width: '340px' }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span className="text-gray-500 font-medium">Password</span>}
              rules={[{ required: true, min: 6 }]}
            >
              <Input.Password
                size="large"
                placeholder="Enter your password"
                style={{ borderRadius: "7px", width: '340px' }}
              />
            </Form.Item>
            <div className="flex items-center justify-end mt-1 mb-2">
              <Link to={TENANT_FORGOT_PASSWORD_PATH} className="text-primary font-semibold">
                Forgot your password?
              </Link>
            </div>
            <Form.Item>
              <Button disabled={isLoading} className="text-lg uppercase !w-full">
                {isLoading ? <AntdLoader color="#FFF" size={20} /> : "Login"}
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center gap-2">
            <p className="text-gray-700">Don't have an account?</p>
            <Link to={TENANT_REGISTER_PATH} className="text-primary hover:text-secondary underline">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
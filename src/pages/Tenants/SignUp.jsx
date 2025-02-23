import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import nspgLogo from "../../assets/logo/nspg_logo.png";
import Button from "../../Components/Button/Button";
import AntdLoader from "../../Components/Loader/AntdLoader";
import { registerUser } from "../../slices/authSlice"; // Change to the sign-up action
import { TENANT_LOGIN_PATH } from "../../routes/ROUTE_CONSTANT";

const SignUp = () => {
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

    // Dispatch for user registration
    dispatch(registerUser({ email: values.email, password: values.password }))
      .unwrap()
      .then((res) => {
        console.log("Registration Success:", res);
        // Notify user and redirect
        // notify("success", "Registration Successful. Please log in.");
        navigate("/signin"); // Redirect to the sign-in page after sign-up
      })
      .catch((err) => {
        console.error("Registration Error:", err);
        // notify("error", err.message || "Registration Failed");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-background">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10 flex flex-col justify-center items-center">
          <img src={nspgLogo} width={200} alt="NSPG Logo" />
          <h2 className="font-medium text-2xl mt-4">National Standard Price Guide</h2>
          <p className="mb-4 text-gray-400">Complete the sign up to get started</p>
          <Form
            form={form}
            validateMessages={validateMessages}
            onFinish={onSubmit}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label={<span className="text-gray-500 font-medium">Name</span>}
              rules={[{ required: true, type: "name" }]}
            >
              <Input
                size="large"
                placeholder="Enter your email address"
                style={{ borderRadius: "7px", width: "340px" }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={<span className="text-gray-500 font-medium">Email Address</span>}
              rules={[{ required: true, type: "email" }]}
            >
              <Input
                size="large"
                placeholder="Enter your email address"
                style={{ borderRadius: "7px", width: "340px" }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span className="text-gray-500 font-medium">Password</span>}
              rules={[{ required: true, min: 6 }]}
            >
              <Input.Password
                size="large"
                placeholder="Create a strong password"
                style={{ borderRadius: "7px", width: "340px" }}
              />
            </Form.Item>
            <Form.Item>
              <Button disabled={isLoading} className="text-lg uppercase !w-full">
                {isLoading ? <AntdLoader color="#FFF" size={20} /> : "Sign Up"}
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center gap-2">
            <p className="text-gray-700">Already have an account?</p>
            <Link to={TENANT_LOGIN_PATH} className="text-primary hover:text-secondary underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import { useEffect, useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../hooks/UseAuth";

export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, []);

  const handlePasswordInput = (event: any) => {
    setPassword(event.target.value);
  };

  const handleUsernameInput = (event: any) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: any }) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    axios
      .post(import.meta.env.VITE_REACT_BASE_URL + "/user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        await auth?.login(res.data.token);
      })
      .catch((error: string) => {
        // if (error.response) {
        //   setAlert({ st: true, msg: error.response.data.error });
        // } else if (error.request) {
        //   setAlert({ st: true, msg: "Network Error" });
        // } else {
        //   setAlert({ st: true, msg: "Something Went Wrong" });
        // }
        console.log(error);
      });
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 text-center h-full items-center p-8 overflow-hidden">
      <div className="hidden md:block mr-6">
        <img src="/images/login-image.jpg" alt="Login Image" className="w-full h-full object-cover max-w-full max-h-full rounded-xl" />
      </div>
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2" placeholder={undefined}>
          Log In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]" placeholder={undefined}>
          Enter your email and password to sign in
        </Typography>
        <form action="#" className="mx-auto max-w-[24rem] text-left" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900" placeholder={undefined}>
                Your Email
              </Typography>
            </label>
            <Input
              id="username"
              color="gray"
              size="lg"
              type="text"
              name="username"
              placeholder="john_doe"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
              crossOrigin={undefined}
              onChange={handleUsernameInput}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900" placeholder={undefined}>
                Password
              </Typography>
            </label>
            <Input
              id="password"
              name="password"
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={<i onClick={togglePasswordVisiblity}>{passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}</i>}
              crossOrigin={undefined}
              onChange={handlePasswordInput}
            />
          </div>
          <Button color="gray" size="lg" className="mt-6" fullWidth placeholder={undefined} type="submit">
            Log in
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography as="a" href="#" color="blue-gray" variant="small" className="font-medium" placeholder={undefined}>
              Forgot password
            </Typography>
          </div>
          {/* <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign in with google
          </Button> */}
          <Typography variant="small" color="gray" className="!mt-4 text-center font-normal" placeholder={undefined}>
            Not registered?{" "}
            <Link to="/signup" className="font-medium text-gray-900">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default Login;

import { useEffect, useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import { useAuth } from "../../hooks/UseAuth";
import { errrorAlert } from "../../store/atoms";
import { ErrorAlert } from "../../components/ErrorAlert";

export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const auth = useAuth();
  const navigate = useNavigate();
  const setErrorAlert = useSetRecoilState(errrorAlert);

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
      .catch((error) => {
        if (error.response) {
          setErrorAlert({ vis: true, msg: error.response.data.error });
        } else if (error.request) {
          setErrorAlert({ vis: true, msg: "Network Error" });
        } else {
          setErrorAlert({ vis: true, msg: "Something Went Wrong" });
        }
        console.log(error);
      });
  };

  return (
    <section className="flex h-screen w-full justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white shadow-lg border border-blue-gray-100 rounded-xl">
        <ErrorAlert />
        <Typography variant="h3" color="blue-gray" className="mb-4 text-center">
          Log In
        </Typography>
        <Typography className="mb-8 text-gray-600 font-normal text-center text-[18px]">Enter your username and password to sign in</Typography>
        <form action="#" className="text-left" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
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
              onChange={handleUsernameInput}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
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
              onChange={handlePasswordInput}
            />
          </div>
          <Button color="gray" size="lg" className="mt-6" fullWidth type="submit">
            Log in
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography as="a" href="#" color="blue-gray" variant="small" className="font-medium">
              Forgot password?
            </Typography>
          </div>
          <Typography variant="small" color="gray" className="!mt-4 text-center font-normal">
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

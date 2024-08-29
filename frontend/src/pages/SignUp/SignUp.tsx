import { useEffect, useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";

import { useAuth } from "../../hooks/UseAuth";
import { errrorAlert } from "../../store/atoms";
import { ErrorAlert } from "../../components/ErrorAlert";

export function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(data);
    axios
      .post(import.meta.env.VITE_REACT_BASE_URL + "/user/register", data, {
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
    <section className="flex h-screen justify-center items-center p-8 overflow-hidden">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg flex flex-col justify-center">
        <ErrorAlert />
        <Typography variant="h3" color="blue-gray" className="mb-2 text-center">
          Sign Up
        </Typography>
        <Typography className="mb-8 text-gray-600 font-normal text-center text-[18px]">Enter your required details to sign up</Typography>
        <form action="#" className="text-left" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
            <div className="mb-6">
              <label htmlFor="fname">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                  Your First Name
                </Typography>
              </label>
              <Input id="fname" color="gray" size="lg" type="text" name="fname" placeholder="John" className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200" />
            </div>
            <div className="mb-6 ml-2">
              <label htmlFor="lname">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                  Your Last Name
                </Typography>
              </label>
              <Input id="lname" color="gray" size="lg" type="text" name="lname" placeholder="Doe" className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
            <div className="mb-6">
              <label htmlFor="username">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                  Set Username
                </Typography>
              </label>
              <Input id="username" color="gray" size="lg" name="username" type="text" placeholder="john_doe" className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200" />
            </div>
            <div className="mb-6 ml-2">
              <label htmlFor="email">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                  Your Email
                </Typography>
              </label>
              <Input id="email" color="gray" size="lg" type="email" name="email" placeholder="name@mail.com" className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200" />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="m-0 p-0">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Set Password
              </Typography>
            </label>
            <Input id="password" name="password" size="lg" placeholder="********" className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200" type={passwordShown ? "text" : "password"} icon={<i onClick={togglePasswordVisiblity}>{passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}</i>} />
          </div>
          <Button color="gray" size="lg" className="mt-6" fullWidth type="submit">
            Sign Up
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography as="a" href="#" color="blue-gray" variant="small" className="font-medium">
              Forgot password?
            </Typography>
          </div>
          <Typography variant="small" color="gray" className="!mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900">
              Log In
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;

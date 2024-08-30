import { Card, Typography, Avatar, Button, Input } from "@material-tailwind/react";
import PlanStatusCard from "../../../components/PlanStatusCard";
import DatabaseConnectionsCard from "../../../components/DatabaseConnectionCard";
import QueryUsageCard from "../../../components/QueryUsageCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../hooks/UseAuth";
import { useSetRecoilState } from "recoil";
import { errrorAlert } from "../../../store/atoms";
import { ErrorAlert } from "../../../components/ErrorAlert";
import { Emoji } from "emoji-picker-react";

export function Profile() {
  const [stats, setStats] = useState({ queryUsedTillNow: 0, totalQueryPercentageChange: 0, connectionUsed: 0, connectionLimit: 0, totalChats: 0, chatLimit: 0, dailyQuery: 0, currentPlan: "Starter", queryLimit: 0, expiryDay: "", remDays: 0, queryExecutionOverTime: [], databaseUsage: [] });
  const [userData, setUserData] = useState({ fname: "", lname: "", username: "", email: "", profileEmjoi: "" });
  const [oldPassword, SetOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const setErrorAlert = useSetRecoilState(errrorAlert);
  const auth = useAuth();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + "/user/stats", {
        headers: {
          Authorization: auth.user,
        },
      })
      .then((res) => {
        setStats(res.data);
        axios
          .get(import.meta.env.VITE_REACT_BASE_URL + "/user", {
            headers: { Authorization: auth.user },
          })
          .then((res) => {
            setUserData(res.data);
          })
          .catch((error) => {
            setErrorAlert({ vis: true, msg: error.response.data.error });
          });
      })
      .catch((error) => {
        setErrorAlert({ vis: true, msg: error.response.data.error });
      });
  }, []);

  function handlePasswordChange() {
    if (newPassword === confirmNewPassword) {
      if (newPassword.length >= 8) {
        axios
          .patch(
            import.meta.env.VITE_REACT_BASE_URL + "/user",
            {
              oldPassword,
              newPassword,
            },
            {
              headers: { Authorization: auth.user },
            }
          )
          .then((res) => {
            setErrorAlert({ vis: true, msg: "User Details Updated" });
          })
          .catch((error) => {
            setErrorAlert({ vis: true, msg: error.response.data.error });
          });
      } else {
        setErrorAlert({ vis: true, msg: "Password Length Should Be Greater Then 8" });
      }
    } else {
      setErrorAlert({ vis: true, msg: "Both Password Should Match" });
    }
  }

  function handleUserDelete() {
    axios
      .delete(import.meta.env.VITE_REACT_BASE_URL + "/user", {
        headers: { Authorization: auth.user },
      })
      .then(() => {
        auth.logout();
      })
      .catch((error) => {
        setErrorAlert({ vis: true, msg: error.response.data.error });
      });
  }

  return (
    <div className="w-full h-full">
      <ErrorAlert />
      {/* Profile Content Section */}
      <div className="w-full p-6 overflow-y-auto border border-blue-gray-100 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h4" color="blue-gray" placeholder={undefined}>
            My Profile
          </Typography>
          <Button variant="gradient" color="teal" placeholder={undefined}>
            Edit Profile
          </Button>
        </div>

        {/* Profile Information Section */}
        <Card className="p-6 mb-6 border border-blue-gray-100 rounded-xl" placeholder={undefined}>
          <div className="flex items-center mb-6">
            {/* <Avatar size="xl" src="https://via.placeholder.com/150" alt="User Avatar" variant="circular" className="mr-6" placeholder={undefined} /> */}
            <Typography variant="h1" className="mr-4" placeholder={undefined}>
              <Emoji unified={userData.profileEmjoi} size={50} />
            </Typography>
            <div>
              <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                {`${userData.fname} ${userData.lname}`}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal" placeholder={undefined}>
                {userData.email}
              </Typography>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="First Name" defaultValue={userData.fname} className="w-full" disabled crossOrigin={undefined} />
            <Input label="Last Name" defaultValue={userData.lname} className="w-full" disabled crossOrigin={undefined} />
            <Input label="Username" defaultValue={userData.username} className="w-full" disabled crossOrigin={undefined} />
            <Input label="Email Address" defaultValue={userData.email} className="w-full" disabled crossOrigin={undefined} />
          </div>
        </Card>

        <Card className="p-6  mb-6 border border-blue-gray-100 rounded-xl" placeholder={undefined}>
          <Typography variant="h6" color="blue-gray" className="mb-4" placeholder={undefined}>
            Account Resources
          </Typography>
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
            <PlanStatusCard planName={`${stats.currentPlan.replaceAll(`"`, "")} Plan`} expiryDate={stats.expiryDay} remainingDays={stats.remDays} />
            <DatabaseConnectionsCard totalConnections={stats.connectionLimit} connectionsUsed={stats.connectionUsed} />
            <QueryUsageCard dailyQueryLimit={stats.queryLimit} queriesUsedToday={stats.dailyQuery} />
          </div>
        </Card>

        {/* Account Settings Section */}
        <Card className="p-6 mb-6 border border-blue-gray-100 rounded-xl" placeholder={undefined}>
          <Typography variant="h6" color="blue-gray" className="mb-4" placeholder={undefined}>
            Account Settings
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input type="password" label="Current Password" className="w-full" crossOrigin={undefined} onChange={(e) => SetOldPassword(e.target.value)} />
            <Input type="password" label="New Password" className="w-full" crossOrigin={undefined} onChange={(e) => setNewPassword(e.target.value)} />
            <Input type="password" label="Confirm New Password" className="w-full" crossOrigin={undefined} onChange={(e) => setConfirmNewPassword(e.target.value)} />
          </div>
          <Button variant="gradient" color="teal" className="mt-6" placeholder={undefined} onClick={handlePasswordChange}>
            Update Password
          </Button>
        </Card>

        {/* Recent Activities Section */}
        <Card className="p-6 border border-blue-gray-100 rounded-xl" placeholder={undefined}>
          <Typography variant="h6" color="blue-gray" className="mb-4" placeholder={undefined}>
            Delete Account
          </Typography>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography variant="small" color="blue-gray" placeholder={undefined}>
                This Action can't be undo
              </Typography>
              <Button variant="gradient" color="red" placeholder={undefined} onClick={handleUserDelete}>
                Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Profile;

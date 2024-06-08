import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/userApiSlice";
const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo.email, userInfo.username]);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
          confirmPassword,
        }).unwrap();
        dispatch(setCredientials({ ...res }));
        toast.success("profile update successfull");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className=" form-input p-4 rounded-sm w-full text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className=" form-input p-4 rounded-sm w-full text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className=" form-input p-4 rounded-sm w-full text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className=" form-input p-4 rounded-sm w-full text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>
              <Link
                to={"/user-orders"}
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                My Order
              </Link>
            </div>
          </form>
          {loadingUpdateProfile && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { FaDotCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const userData = JSON.parse(loggedUser);
      setUser(userData);
      setUpdatedUser(userData); // Initialize the updatedUser state with loggedUser data
    } else {
      navigate("/userlogin");
    }
  }, [navigate]);
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveChanges = async () => {
    // Update localStorage with the updated user
    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
  
    // Send the updated user data to your API or JSONBin
    const binId = "67f4ece28561e97a50fae858";  // Replace with your bin ID
    const apiKey = "$2a$10$M/z2e.cKX1SUsOT62D4pk.gbhiuJhRx0u3VzNAe.DsTPIHHAQE6Zu";  // Replace with your API key
  
    try {
      // First, fetch the existing data from JSONBin
      const fetchResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
      });
  
      if (!fetchResponse.ok) {
        throw new Error("Failed to fetch current data from JSONBin.");
      }
  
      const currentData = await fetchResponse.json();
      const existingUsers = currentData.record.users || []; // Assuming `users` is the array of all users
  
      // Merge the updated user with existing users
      const updatedUsers = existingUsers.map((user: any) =>
        user.id === updatedUser.id ? updatedUser : user
      );
  
      // Update the data on JSONBin
      const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        method: "PUT",  // Use PUT to update the entire database
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
        body: JSON.stringify({
          users: updatedUsers,  // Send the updated users array
        }),
      });
  
      if (response.ok) {
        alert("Profile updated successfully!");
        setUser(updatedUser);  // Update state to reflect changes
        setIsEditing(false);    // Exit edit mode
      } else {
        throw new Error("Failed to update profile.");
      }
    } catch (error) {
    //   alert("Error updating profile: " + error.message);
    }
  };
  
  

  if (!user) return null;

  return (
    <div className=" mx-auto p-6 bg-black text-gray-400 shadow-md  ">
     <h2 className="text-xl font-semibold mb-6 text-center">
  {user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}
  's Profile
</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <img src={user?.profilePicture} className="rounded" alt="" />
          <Detail
            label="Full Name"
            value={isEditing ? updatedUser.fullName : user.fullName}
            onChange={handleEditChange}
            name="fullName"
            isEditing={isEditing}
          />
          <Detail
            label="Username"
            value={isEditing ? updatedUser.username : user.username}
            onChange={handleEditChange}
            name="username"
            isEditing={isEditing}
          />
          <Detail
            label="Email"
            value={isEditing ? updatedUser.email : user.email}
            onChange={handleEditChange}
            name="email"
            isEditing={isEditing}
          />
          <Detail
            label="Phone Number"
            value={isEditing ? updatedUser.phoneNumber : user.phoneNumber}
            onChange={handleEditChange}
            name="phoneNumber"
            isEditing={isEditing}
          />
          <Detail
            label="Location"
            value={isEditing ? updatedUser.location : user.location}
            onChange={handleEditChange}
            name="location"
            isEditing={isEditing}
          />
          <Detail
            label="Date Signed Up"
            value={new Date(user.dateSignedUp).toLocaleString()}
            isEditing={false}
          />
        </div>

        {/* <div>
          <h3 className="font-semibold text-lg mt-4">Bio</h3>
          {isEditing ? (
            <textarea
              name="bio"
              value={updatedUser.bio}
              onChange={handleEditChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          ) : (
            <p className="text-gray-700">{user.bio}</p>
          )}
        </div> */}
        <div>
  <h3 className="font-semibold text-lg mt-4">Bio</h3>
  {isEditing ? (
    <textarea
      name="bio"
      value={updatedUser.bio}  // Bind updatedUser.bio for editing
      onChange={handleEditChange}  // Handle changes for bio input
      className="w-full border px-3 py-2 rounded-md"
    />
  ) : (
    <p className="text-gray-700">{user.bio}</p>  // Display the original bio when not editing
  )}
</div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Detail
            label="Instagram"
            value={isEditing ? updatedUser.socialMedia?.instagram : user.socialMedia?.instagram || "-"}
            onChange={handleEditChange}
            name="instagram"
            isEditing={isEditing}
          />
          <Detail
            label="TikTok"
            value={isEditing ? updatedUser.socialMedia?.tiktok : user.socialMedia?.tiktok || "-"}
            onChange={handleEditChange}
            name="tiktok"
            isEditing={isEditing}
          />
        </div>

        <div>
          <h3 className="font-semibold text-lg mt-4 mb-2">Profile Picture</h3>
          <div className="flex flex-wrap gap-2">
            {user.profilePicture.map((url: string, idx: number) => (
              <img
                key={idx}
                src={url}
                alt="Profile"
                className="h-24 w-24 object-cover rounded border"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => {
            localStorage.removeItem("loggedUser");
            navigate("/userlogin");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`${
            isEditing ? "bg-gray-500" : "bg-green-500"
          } text-white px-4 py-2 rounded hover:bg-green-600`}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>

        {isEditing && (
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};
const Detail = ({
    label,
    value,
    onChange,
    name,
    isEditing
  }: {
    label: string;
    value: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;  // Make onChange optional
    name?: string;  // Make name optional
    isEditing: boolean;
  }) => (
    <div>
      <span className="font-medium">{label}:</span>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded-md mt-1"
        />
      ) : (
        <p className="text-[#ccc] text-sm flex gap-2 mt-2"> <FaDotCircle/>{value}</p>
      )}
    </div>
  );
  

export default Profile;

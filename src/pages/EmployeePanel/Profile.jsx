import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.email || "");
 const [photo, setPhoto] = useState(
  localStorage.getItem("profilePhoto") || user?.photo || ""
);
  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow">
          {/* Avatar */}
          <div className="relative w-16 h-16">
            {photo ? (
              <img
                src={photo}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium">{user?.email}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Role</label>
              <p className="font-medium capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {" "}
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>

          {/*edit section*/}
          {isEditing && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
                {/* Header */}
                <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

                {/* Form */}
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="w-full p-3 border rounded-lg mt-1 bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="text-sm text-gray-500">Role</label>
                    <input
                      type="text"
                      value={user?.role}
                      disabled
                      className="w-full p-3 border rounded-lg mt-1 bg-gray-100 cursor-not-allowed capitalize"
                    />
                  </div>
                  {/* Photo Upload */}
                  <div>
                    <label className="text-sm text-gray-500">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setPhoto(imageUrl);
                        }
                      }}
                      className="w-full mt-1"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      const updatedUser = {
                        ...user,
                        name,
                        photo,
                      };

                      localStorage.setItem("user", JSON.stringify(updatedUser));
                      localStorage.setItem("profilePhoto", photo);

                      window.location.reload(); // refresh to update UI
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

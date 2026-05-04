import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");

  // 🔥 Load initial data
  useEffect(() => {
    if (!user) return;

    setName(user.first_name || "");
    setPhone(user.phone || "");
    setLocation(user.location || "");
  }, [user]);

  // 🔥 Save (PATCH API)
  const handleSave = async () => {
    try {
      await axios.patch("/api/me/", {
        first_name: name,
        phone: phone,
        location: location,
      });

      // 🔥 refresh user
      const res = await axios.get("/api/me/");
      setUser(res.data);

      setIsEditing(false);
      alert("Profile updated successfully");

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Update failed");
    }
  };

  // 🔥 Image preview only
  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        <div className="bg-white p-6 rounded-2xl shadow">

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16">
              {photo ? (
                <img
                  src={photo}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                  {(name || user?.email)?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                {name || "No Name"}
              </h2>
              <p className="text-gray-500 text-sm">{user?.role}</p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <p className="font-medium">{name || "Not set"}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium">{user?.email}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <p className="font-medium">{phone || "Not set"}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Location</label>
              <p className="font-medium">{location || "Not set"}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Role</label>
              <p className="font-medium capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>

          {/* EDIT MODAL */}
          {isEditing && (
            <div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
              onClick={() => setIsEditing(false)}
            >
              <div
                className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

                <div className="space-y-4">

                  {/* Name */}
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border rounded-lg mt-1"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 border rounded-lg mt-1"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-3 border rounded-lg mt-1"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="w-full p-3 border rounded-lg mt-1 bg-gray-100"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="text-sm text-gray-500">Role</label>
                    <input
                      type="text"
                      value={user?.role}
                      disabled
                      className="w-full p-3 border rounded-lg mt-1 bg-gray-100"
                    />
                  </div>

                  {/* Photo */}
                  <div>
                    <label className="text-sm text-gray-500">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(e.target.files[0])
                      }
                    />
                  </div>

                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
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
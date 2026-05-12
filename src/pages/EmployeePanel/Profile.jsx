import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import {
  getEmployeeProfile,
  updateEmployeeProfile,
} from "../../services/authService";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    email: "",
    role: "",
    employee_code: "",
    first_name: "",
    last_name: "",
    phone: "",
    department: "",
    designation: "",
    location: "",
    joining_date: "",
    employment_type: "",
    status: "",
  });

  const [photo, setPhoto] = useState("");

  // Fetch employee profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const data = await getEmployeeProfile();

        console.log("Profile API response:", data);

        const profileData = data?.user || data?.employee || data;

        setProfile({
          email: profileData?.email || user?.email || "",
          role: profileData?.role || user?.role || "",
          employee_code: profileData?.employee_code || "",
          first_name: profileData?.first_name || "",
          last_name: profileData?.last_name || "",
          phone: profileData?.phone || "",
          department: profileData?.department || "",
          designation: profileData?.designation || "",
          location: profileData?.location || "",
          joining_date: profileData?.joining_date || "",
          employment_type: profileData?.employment_type || "",
          status: profileData?.status || "",
        });

        const storedPhoto = localStorage.getItem(`profile_photo_${user?.email}`);
        if (storedPhoto) {
          setPhoto(storedPhoto);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);

        // fallback if API fails
        setProfile((prev) => ({
          ...prev,
          email: user?.email || "",
          role: user?.role || "",
          first_name: user?.email?.split("@")[0] || "",
        }));
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fullName =
    `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
    profile.email?.split("@")[0] ||
    "No Name";

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save function with PATCH API
  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        email: profile.email,
        role: profile.role,
        employee_code: profile.employee_code,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        department: profile.department ? Number(profile.department) : null,
        designation: profile.designation || null,
        location: profile.location,
        joining_date: profile.joining_date || null,
        employment_type: profile.employment_type,
        status: profile.status,
      };

      const updatedData = await updateEmployeeProfile(payload);

      console.log("Updated profile:", updatedData);

      if (photo) {
        localStorage.setItem(`profile_photo_${profile.email}`, photo);
      }

      const updatedUser = {
        ...user,
        email: profile.email,
        role: profile.role,
        first_name: profile.first_name,
        last_name: profile.last_name,
        employee_code: profile.employee_code,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  // Image convert to base64
  const handleImageChange = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6 max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow text-center text-gray-500">
            Loading profile...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
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
                  {(fullName || profile.email)?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold">{fullName}</h2>
              <p className="text-gray-500 text-sm capitalize">
                {profile.role || "employee"}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Info label="Email" value={profile.email} />
            <Info label="Role" value={profile.role} capitalize />
            <Info label="Employee Code" value={profile.employee_code} />
            <Info label="Phone" value={profile.phone} />
            <Info label="Department ID" value={profile.department} />
            <Info label="Designation" value={profile.designation} />
            <Info label="Location" value={profile.location} />
            <Info label="Joining Date" value={profile.joining_date} />
            <Info label="Employment Type" value={profile.employment_type} />
            <Info label="Status" value={profile.status} />
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
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
              onClick={() => setIsEditing(false)}
            >
              <div
                className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                  />

                  <Input
                    label="Role"
                    name="role"
                    value={profile.role}
                    onChange={handleChange}
                  />

                  <Input
                    label="Employee Code"
                    name="employee_code"
                    value={profile.employee_code}
                    onChange={handleChange}
                  />

                  <Input
                    label="First Name"
                    name="first_name"
                    value={profile.first_name}
                    onChange={handleChange}
                  />

                  <Input
                    label="Last Name"
                    name="last_name"
                    value={profile.last_name}
                    onChange={handleChange}
                  />

                  <Input
                    label="Phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                  />

                  <Input
                    label="Department ID"
                    name="department"
                    type="number"
                    value={profile.department}
                    onChange={handleChange}
                  />

                  <Input
                    label="Designation"
                    name="designation"
                    value={profile.designation}
                    onChange={handleChange}
                  />

                  <Input
                    label="Location"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                  />

                  <Input
                    label="Joining Date"
                    name="joining_date"
                    type="date"
                    value={profile.joining_date || ""}
                    onChange={handleChange}
                  />

                  <Input
                    label="Employment Type"
                    name="employment_type"
                    value={profile.employment_type}
                    onChange={handleChange}
                  />

                  <Input
                    label="Status"
                    name="status"
                    value={profile.status}
                    onChange={handleChange}
                  />

                  {/* Photo */}
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-500">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e.target.files[0])}
                      className="w-full mt-1"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200"
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
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

const Info = ({ label, value, capitalize }) => {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <p className={`font-medium ${capitalize ? "capitalize" : ""}`}>
        {value || "Not set"}
      </p>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
};

export default Profile;
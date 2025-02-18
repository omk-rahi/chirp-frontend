const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const formatTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export const getProfileImage = (user) => {
  return `${backendUrl}/uploads/${user.profile}`;
};

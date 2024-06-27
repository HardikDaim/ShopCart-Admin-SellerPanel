import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "seller") {
      navigate("/seller/dashboard", { replace: true });
    } else if (role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [role, navigate]);

  // Optionally, you can return null or a loading spinner while redirection happens.
  return null;
};

export default Home;

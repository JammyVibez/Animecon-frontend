import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    console.log("Attempting login with credentials:", userCredential);
    const res = await axios.post(`${API}/api/auth/login`, userCredential);
    console.log("Login response:", res.data);
    localStorage.setItem("user", JSON.stringify(res.data)); // Save user to localStorage
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Login failed" });
  }
};


// import axios from "axios";

// export const loginCall = async (userCredential, dispatch) => {
//   dispatch({ type: "LOGIN_START" });
//   try {
//     const res = await axios.post("/auth/login", userCredential);
//     dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//   } catch (err) {
//     dispatch({ type: "LOGIN_FAILURE", payload: err });
//   }
// };


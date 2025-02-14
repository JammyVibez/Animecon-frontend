// import axios from "axios";

// const API = process.env.REACT_APP_API_URL;

// export const loginCall = async (userCredential, dispatch) => {
//   dispatch({ type: "LOGIN_START" });
//   try {
//     console.log("Attempting login with credentials:", userCredential);
//     const res = await axios.post(`${API}/api/auth/login`, userCredential);
//     console.log("Login response:", res.data);
//     localStorage.setItem("user", JSON.stringify(res.data)); // Save user to localStorage
//     dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//   } catch (err) {
//     console.error("Login error:", err.response?.data || err.message);
//     dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Login failed" });
//   }
// };


// import axios from "axios";

// const API = process.env.REACT_APP_API_URL;

// export const loginCall = async (userCredential, dispatch) => {
//   dispatch({ type: "LOGIN_START" });

//   try {
//     console.log("Attempting login with credentials:", userCredential);
    
//     const res = await axios.post(`${API}/api/auth/login`, userCredential);
//     console.log("Login response:", res.data);
  
//   // Debugging logs
//   console.log("Full API response:", res);
//   console.log("API response data:", res.data);

//   if (!res.data || !res.data.id) {
//     throw new Error("Invalid response: Missing user ID");
//   }


//     // Ensure _id is used properly
//     const userData = { ...res.data, id: res.data._id }; 

//     // Save user to localStorage
//     localStorage.setItem("user", JSON.stringify(userData));

//     dispatch({ type: "LOGIN_SUCCESS", payload: userData });
//   } catch (err) {
//     console.error("Login error:", err.response?.data || err.message);
//     dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Login failed" });
//   }
// };



export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });

  try {
    const res = await axios.post(`${API}/api/auth/login`, userCredential);
    console.log("Login response:", res.data); // Debugging

    if (res.data && res.data.id) { // Ensure user.id exists
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } else {
      throw new Error("Invalid login response: Missing user ID");
    }
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Login failed" });
  }
};

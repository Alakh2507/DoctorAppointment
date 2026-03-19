import React, { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import { toast } from "react-toastify";

const Verify = () => {
  const { backendUrl, token } = useContext(StoreContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const success = params.get("success");
  const appointmentId = params.get("appointmentId");

  const verifyPayment = async () => {
    try {
      if (success === "true" && appointmentId) {
        const response = await axios.post(
          `${backendUrl}/api/userpayment/verifyPayment`,
          { appointmentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          toast.success("Payment Successful");
          navigate("/myappointment");
        }
      } else {
        toast.error("Payment Failed");
        navigate("/myappointment");
      }
    } catch (error) {
      toast.error("Verification Failed");
      navigate("/myappointment");
    }
  };

  useEffect(() => {
    if (token) {
      verifyPayment();
    }
  }, [appointmentId, token]);

  return <div>Verifying payment...</div>;
};

export default Verify;

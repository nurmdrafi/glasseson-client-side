import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthUserContext from "../context/AuthUserContext";
import axios from "../api/axios";
import Loading from "../components/Loading";
import FormErrorMessage from "../components/FormErrorMessage";

const Register = () => {
  const { isLoading, setIsLoading } = useAuthUserContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  // create new user
  const createNewUser = async (userInfo) => {
    const res = await axios.post("/auth/register", userInfo);
    return res.data;
  };

  const handleRegistration = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "match",
        message: "Please confirm your password",
      });
    } else {
      // create new user / register
      const userInfo = {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      try {
        setIsLoading(true);
        const res = await createNewUser(userInfo);
        if (res) {
          setIsLoading(false);
          navigate("/login");
        }
      } catch (err) {
        toast.error(err.response.data.message, {
          id: "signUp error",
        });
      } finally {
        reset();
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" flex min-h-[calc(100vh-65px)] items-center justify-center">
      <div className="card w-96 bg-base-100 drop-shadow-lg">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-primary">Register</h2>

          {/* Form Start */}
          <form
            onSubmit={handleSubmit(handleRegistration)}
            className=" flex flex-col gap-3 text-gray-800"
          >
            {/* Username */}
            <div className="form-control min-w-[350px]">
              <label className="text-left  pb-1">Username</label>
              <input
                type="text"
                className={`input input-bordered w-full bg-secondary ${
                  errors.username && "input-error"
                }`}
                {...register("username", {
                  required: "Please enter your username",
                  minLength: {
                    value: 3,
                    message: "Your username must have 3 characters",
                  },
                })}
              />
              {/* Error Message */}
              <FormErrorMessage message={errors?.username?.message} />
            </div>

            {/* First Name & Last Name*/}
            <div className="form-control min-w-[350px]">
              <div className="flex gap-3">
                <div className="flex flex-col items-start justify-center">
                  <label className="text-left  pb-1">First Name</label>
                  <input
                    type="text"
                    className={`input input-bordered w-full bg-secondary ${
                      errors.first_name && "input-error"
                    }`}
                    {...register("first_name", {
                      required: "Please enter your first name",
                      minLength: {
                        value: 3,
                        message: "Your first name must have 3 characters",
                      },
                    })}
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <label className="pb-1">Last Name</label>
                  <input
                    type="text"
                    className={`input input-bordered w-full bg-secondary ${
                      errors.last_name && "input-error"
                    }`}
                    {...register("last_name", {
                      required: "Please enter your last name",
                      minLength: {
                        value: 3,
                        message: "Your last name must have 3 characters",
                      },
                    })}
                  />
                </div>
              </div>
              {/* Error Message */}
              {errors?.first_name?.message || errors?.last_name?.message ? (
                <FormErrorMessage message="Please enter your first name & last name" />
              ) : (
                <></>
              )}
            </div>

            {/* Email */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Email</label>
              <input
                type="text"
                className={`input input-bordered w-full bg-secondary ${
                  errors.email && "input-error"
                }`}
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Please provide a valid email",
                  },
                })}
              />
              {/* Error Message */}
              <FormErrorMessage message={errors?.email?.message} />
            </div>

            {/* Password*/}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Password</label>
              <input
                type="password"
                className={`input input-bordered w-full bg-secondary ${
                  errors.password && "input-error"
                }`}
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 8,
                    message: "Your password must have 8 characters",
                  },
                  validate: {
                    whitespace: (v) =>
                      /^\S*$/.test(v) ||
                      "Your password must not contain whitespace",
                    oneUpperCase: (v) =>
                      /^(?=.*[A-Z]).*$/.test(v) ||
                      "Your password must have at least one uppercase character",
                    oneLowerCase: (v) =>
                      /^(?=.*[a-z]).*$/.test(v) ||
                      "Your password must have at least one lowercase character",
                    oneDigit: (v) =>
                      /^(?=.*[0-9]).*$/.test(v) ||
                      "Your password must have at least one digit",
                    oneSymbol: (v) =>
                      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(
                        v
                      ) ||
                      "Your password must have at least one special symbol",
                  },
                })}
              />
              {/* Error Message */}
              <FormErrorMessage message={errors?.password?.message} />
            </div>

            {/* Confirm Password */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Confirm Password</label>
              <input
                type="password"
                className={`input input-bordered w-full bg-secondary mb-2 ${
                  errors.confirmPassword && "input-error"
                }`}
                {...register("confirmPassword")}
              />
              {/* Error Message */}
              <FormErrorMessage message={errors?.confirmPassword?.message} />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-active btn-primary text-white uppercase min-w-[350px]"
            >
              Register
            </button>
          </form>
          {/* Form End */}

          <p className="text-black">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Log In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

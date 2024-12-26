import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { object, string } from "yup";
import { useState } from "react";

export default function SignUp() {
  let navigate = useNavigate()



  const [error, setError] = useState(null);
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

  let schema = object({
    name: string()
      .required("Name is required")
      .min(3, "Must be atleast 3 character")
      .max(20, "Must be less than 20 character"),
    email: string().required("Email is required").email("Invalid Email"),
    phone: string()
      .required("Phone is required")
      .matches(phoneRegex, "sorry, we only accept Egyptian phone number"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
      age: string().required('Age is required')
  });


  async function handleSubmit(values) {
    let toastId = toast.loading('Waiting...')
    const options = {
      url: 'https://note-sigma-black.vercel.app/api/v1/users/signUp',
      method:'POST',
      data:values
    }

    try {
      let {data} = await axios.request(options)
      if (data.msg === 'done') {
        toast.success('User Logged In Successfulyy')
        navigate('/login')
        
      }
      
    } catch (error) {
      setError(error.response.data.msg)
      
    }finally{
      toast.dismiss(toastId)
    }
  }

  let formik = useFormik({
    initialValues: {
      name:'',
      email: "",
      password: "",
      age:'',
      phone:''

    },
    validationSchema:schema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <section className="">
        <div className="container mt-20 rounded-md flex flex-col border-solid border-gray-300 border-2 py-8  px-4">
          <h2 className="text-center font-semibold text-2xl my-6 text-gray-700">
            Sign Up Now
          </h2>
          <form className="w-3/4 mx-auto space-y-4" onSubmit={formik.handleSubmit}>
            <div className="name">
              <input
                className="form-control"
                type="text"
                placeholder="Enter Your Full Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && <p className="text-red-400 mt-1 text-sm">*{formik.errors.name}</p>}
            </div>
            <div className="email">
              <input
                className="form-control"
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && <p className="text-red-400 mt-1 text-sm">*{formik.errors.email}</p>}
              {error && <p className="text-red-400 mt-1 text-sm">*{error}</p>}
            </div>
            <div className="password">
              <input
                className="form-control"
                type="password"
                placeholder="Enter Your Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && <p className="text-red-400 mt-1 text-sm">*{formik.errors.password}</p>}
              
            </div>
            <div className="age">
              <input
                className="form-control"
                type="number"
                placeholder="Enter Your Age"
                name="age"
                onChange={formik.handleChange}
                value={formik.values.age}
                onBlur={formik.handleBlur}
              />
              {formik.errors.age && formik.touched.age && <p className="text-red-400 mt-1 text-sm">*{formik.errors.age}</p>}
              
            </div>
            <div className="phone">
              <input
                className="form-control"
                type="tel"
                placeholder="Enter Your Phone Numbe"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone && <p className="text-red-400 mt-1 text-sm">*{formik.errors.phone}</p>}
              
            </div>
            <div className="flex justify-between items-center">
              <Link className="hover:text-blue-500" to={'/login'}>Already had an account?</Link>
              <button className="btn bg-blue-500 hover:bg-blue-600" type="submit">
              Sign up
            </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

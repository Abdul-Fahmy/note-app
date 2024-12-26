import axios from 'axios';
import { useFormik } from 'formik';
import  { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { data, Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { UserContext } from '../../context/User.context';

export default function Login() {
const {setToken} = useContext(UserContext)

  let navigate = useNavigate()



  const [error, setError] = useState(null);
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  let schema = object({
    email: string().required("Email is required").email("Invalid Email"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
     
  });


  async function handleSubmit(values) {
    const toastId = toast.loading('Waiting...')
    const options = {
      url : 'https://note-sigma-black.vercel.app/api/v1/users/signIn',
      method: 'POST',
      data:values,
    }

    try {
      let {data} = await axios.request(options)
if (data.msg === 'done') {
  toast.success('User Logged In Successfully')
localStorage.setItem('token',data.token)  
setToken(data.token)
navigate('/home')
}      
    } catch (error) {
setError(error.response.data.msg)      
    }finally{
      toast.dismiss(toastId)
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
     
    },
    validationSchema:schema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <section className="">
        <div className="container mt-20 rounded-md flex flex-col border-solid border-gray-300 border-2 py-8  px-4">
          <h2 className="text-center font-semibold text-2xl my-6 text-gray-700">
            LogIn Now
          </h2>
          <form className="w-3/4 mx-auto space-y-4" onSubmit={formik.handleSubmit}>
            <div className="email">
              <input
                className="form-control"
                type="email"
                placeholder="Enter Your Email"
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
            <div className="flex justify-between items-center">
              <Link className="hover:text-blue-500" to={'/login'}>Don't have an account?</Link>
              <button className="btn bg-blue-500 hover:bg-blue-600" type="submit">LogIn</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

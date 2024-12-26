import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User.context";

export default function NavBar() {
  let navigate = useNavigate();
  const { token, logOut } = useContext(UserContext);

  return (
    <>
      <section className="navBar bg-black text-white">
        <div className="container flex justify-around items-center py-4 px-6">
          <div className="logo">
            <h1 className="text-2xl uppercase font-semibold">Note App</h1>
          </div>

          <div className="tabs">
            <NavLink
              to={"/"}
              className={({ isActive }) => {
                return `px-4 py-2 hover:border-solid hover:border-white hover:border hover:rounded-md  ${
                  isActive ? "bg-white text-black font-semibold rounded-md" : ""
                }`;
              }}
            >
              Home
            </NavLink>
          </div>

          <div className="logs ">
            <ul className="flex justify-center items-center gap-5">
              {!token ? (
                <>
                  {" "}
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `px-4 py-2 hover:border-solid hover:border-white hover:border hover:rounded-md  ${
                          isActive
                            ? "bg-white text-black font-semibold rounded-md"
                            : ""
                        }`;
                      }}
                      to={"/signUp"}
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `px-4 py-2 hover:border-solid hover:border-white hover:border hover:rounded-md  ${
                          isActive
                            ? "bg-white text-black font-semibold rounded-md"
                            : ""
                        }`;
                      }}
                      to={"/login"}
                    >
                      Log In
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
              {token ? (
                <li>
                  <NavLink 
                  to={'/login'}
                   onClick={() => {
                    logOut();
                    setTimeout(() => {
                      navigate("/login");
                    }, 2000);
                  }}
                    className={({ isActive }) => {
                      return `px-4 py-2 hover:border-solid hover:border-white hover:border hover:rounded-md  ${
                        isActive
                          ? "bg-white text-black font-semibold rounded-md"
                          : ""
                      }`;
                    }}
                   
                  >
                    Sign Out
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

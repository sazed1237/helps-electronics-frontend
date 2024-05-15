import React, { useContext, useState } from "react";
import logo from "../../assets/logo1.png";
import { LuSearch } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../../common/api";
import { toast } from "react-toastify";
import { setUserDetails } from "../../store/userSlice";
import Context from "../../context/context";
import scrollTop from "../../utils/scrollTop";

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [navDisplay, setNavDisplay] = useState(false)
  const user = useSelector(state => state?.user?.user)
  const context = useContext(Context)

  const searchInput = useLocation()
  const urlSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = urlSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)


  // console.log(searchInput?.search.split("=")[1])

  const handleLogout = async () => {
    const fetchData = await fetch(summaryApi.userLogout.url, {
      method: summaryApi.userLogout.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate('/')
    } else {
      toast.error(data.message)
    }

  }
  // console.log('header cart count', context)


  // search function
  const handleSearch = (event) => {
    const search = event.target.value
    // console.log(search)

    setSearch(search)

    if (search) {
      navigate(`/search?q=${search}`)
    } else {
      navigate('/search')
    }

  }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-50">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
       
       {/* logo */}
        <div>
          <Link to={'/'} onClick={scrollTop}>
            <img className="h-9 lg:h-10 rounded-full" src={logo} alt="" />
          </Link>
        </div>

{/* search bar */}
        <div className="hidden lg:flex items-center h-8 border rounded-full pl-2">
          <input
            onChange={handleSearch}
            type="text"
            name="search"
            placeholder="Search product here"
            className="outline-none md:w-64 bg-none "
            id=""
            value={search}
          />
          <div className="text-lg bg-red-500 h-8 w-12 flex items-center justify-center rounded-r-full text-white cursor-pointer ">
            <LuSearch />
          </div>
        </div>


        {/* user Profile */}
        <div className="flex gap-3 md:gap-7 items-center">

          <div className="relative flex justify-center">
            <div onClick={() => setNavDisplay(prev => !prev)} className="text-2xl md:text-3xl cursor-pointer">
              {
                user ? <img className="h-9 w-9 rounded-full" src={user.profilePhoto} alt={user.name} /> : <FaRegUserCircle />
              }
            </div>
            {
              user && user?.role == "ADMIN" ? <>
                {
                  navDisplay && (
                    <div className="absolute bg-white shadow-xl top-10 h-fit p-3 rounded-b-sm hidden md:block">
                      <nav>
                        <Link to={'admin-panel/all-users'} onClick={() => setNavDisplay(prev => !prev)} className="whitespace-nowrap hover:bg-slate-100 p-2">Admin Panel</Link>
                      </nav>
                    </div>
                  )
                }

              </> : <></>
            }
          </div>




          <div className="text-2xl cursor-pointer relative">

            {
              user ? (
                <Link to={'/cart'}>
                  <span>
                    <FaCartArrowDown />
                  </span>

                  <div className="bg-red-500 text-white w-7 px-1 flex items-center justify-center rounded-full absolute -top-3 -right-3">
                    <span className="text-sm">{context?.countProduct}</span>
                  </div>
                </Link>
              )
                :
                (
                  <div>
                    <span>
                      <FaCartArrowDown />
                    </span>

                    <div className="bg-red-500 text-white w-7 px-1 flex items-center justify-center rounded-full absolute -top-3 -right-3">
                      <span className="text-sm">0</span>
                    </div>
                  </div>
                )
            }


          </div>

          <div>
            {
              user ? (
                <button onClick={handleLogout} className="bg-red-500 px-2 md:px-3 py-1 rounded-full text-white hover:bg-red-600" >Logout</button>
              ) : (
                <Link to={'login'}>
                  <button className="bg-red-500 px-2 md:px-3 py-1 rounded-full text-white hover:bg-red-600" >Login</button>
                </Link>
              )
            }

          </div>

        </div>
      </div >
    </header >
  );
};

export default Header;

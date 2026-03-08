import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    // let passwordArray;
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "icons/eye.png";
    }
  };

  const savePassword = () => {
    if(form.site.length>3&& form.username.length>3&&form.password.length>3){
    setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
    console.log([...passwordArray, form]);
    setform({site:"",username:"",password:""})
    toast("Password saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }else{
    toast('Error:Passwordd not saved!')
  }
  };

        const deletePassword = (id) => {
          let c = confirm("Do you really want to delete this password")
      if(c){
        setPasswordArray(passwordArray.filter(item=>item.id!==id));
     localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
         toast("Password deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
   }

     const editPassword = (id) => {
        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id));
         
  }
   



  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
 
      <div className="  p-2 pt-3 md:mycontainer min-h-[85.5vh]">
        <h1 className=" py-2  text-4xl text font-bold text-center ">
          <span className=" py-2  text-green-700">&lt;</span>
          <span>Pass</span>
          <span className=" py-2  text-green-500">
            OP/&gt;
          </span>
        </h1>
        <p className=" py-2  text-green-900 text-lg text-center ">
          Your own Password Manager
        </p>
        <div className=" py-2  text-black flex flex-col gap-8 p-4 items-center ">
          <input
            className=" py-2  rounded-full border border-green-500 text-black p-4 py-1 w-full"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            type="text"
            name="site"
            id="site"
          />
          <div className=" py-2  flex flex-col md:flex-row w-full gap-8 justify-between">
            <input
              className=" py-2  rounded-full border border-green-500 text-black p-4 py-1 w-full"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
            />
            <div className=" py-2  relative">
              <input
                ref={passwordRef}
                className=" py-2  rounded-full border border-green-500 text-black p-4 py-1 w-full"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
              />
              <span
                className=" py-2 absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className=" py-2 w-8 p-2hh"
                  width={20}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className=" py-2  flex justify-center  items-center  gap-2 bg-green-600 rounded-full px-5 py-2 w-fit hover:bg-green-500 border-2 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/gzqofmcx.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className=" py-2  password">
          <h2 className="font-bold text-2xl py-4 ">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className=" mb-10 py-2 border border-white table-auto w-full rounded-md overflow-hidden">
              <thead className=" py-2 border border-white bg-green-800 text-white">
                <tr>
                  <th className=" py-2 border border-white py-2">Site</th>
                  <th className=" py-2 border border-white py-2">Username</th>
                  <th className=" py-2 border border-white py-2">Password</th>
                  <th className=" py-2 border border-white py-2">Actions</th>

                </tr>
              </thead>
              <tbody className=" py-2 border border-white bg-green-100 ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" flex items-center justify-center py-2 border border-white text-center  ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className=" lordiconcopy size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className=" justify-center py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className=" lordiconcopy size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" flex items-center justify-center py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className=" lordiconcopy size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border border-white text-center ">
                       <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
                        <lord-icon 
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{"width":"25px","height":"25px"}}>
                        </lord-icon>
                       </span>
                       <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>
                        <lord-icon 
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{"width":"25px","height":"25px"}}>
                        </lord-icon>
                       </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;

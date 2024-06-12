import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [editId, setEditId] = useState(null);
    
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        if (ref.current.src.includes("eye_cross.png")) {
            ref.current.src = "eye.png"
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "eye_cross.png"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = () => {
        if( form.site.length >1 && form.username.length >1 && form.password.length >1){

            if (editId) {
                const updatedArray = passwordArray.map(item => 
                    item.id === editId ? { ...form, id: editId } : item
                );
                setPasswordArray(updatedArray);
                localStorage.setItem("passwords", JSON.stringify(updatedArray));
            } else {
                const newEntry = { ...form, id: uuidv4() };
                setPasswordArray([...passwordArray, newEntry]);
                localStorage.setItem("passwords", JSON.stringify([...passwordArray, newEntry]));
            }
            setform({ site: "", username: "", password: "" });
            setEditId(null);
        toast('Password saved.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }else{
        toast('Error : cannot save password.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
}

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete the password?")
        if (c) {
            const updatedArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));
            toast('Password deleted succesfully.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        const itemToEdit = passwordArray.find(i => i.id === id);
        setform(itemToEdit);
        setEditId(id);
    }

    const handleChnage = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
                />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#00ff00_100%)]"></div>

            <div className="px-3 md:px-0 md:mycontainer ">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-500 text-2xl">&lt;</span>
                    Pass
                    <span className="text-green-500 text-2xl ">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChnage} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' id='site'/>
                    <div className="flex flex-col md:flex-row w-full gap-8">
                        <input value={form.username} onChange={handleChnage} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id='username'/>
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChnage}  placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password'/>
                            {/* <span className='absolute right-1 top-1.5 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src="/eye_cross.png" width={20} alt="" />
                            </span> */}
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex text-black border border-green-900 gap-2 justify-center items-center bg-green-400 rounded-full px-4 py-2 w-fit hover:bg-green-300'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        {editId ? 'Update Password' : 'Save Password'}
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site URL</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='border border-white py-2 text-center'>
                                            <div className="flex items-center justify-center">
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='size-7 cursor-pointer lordiconcopy ' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "padding": "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border border-white py-2 text-center'>
                                            <div className="flex items-center justify-center">
                                                <span>{item.username}</span>
                                                <div className='size-7 cursor-pointer lordiconcopy ' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "padding": "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border border-white py-2 text-center '>
                                            <div className="flex items-center justify-center">
                                                <span>{item.password}</span>
                                                <div className='size-7 cursor-pointer lordiconcopy ' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "padding": "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border border-white py-2 text-center '>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xaubpxfc.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager





// import React from 'react'
// import { useRef, useState, useEffect } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import {v4 as uuidv4} from 'uuid'

// const Manager = () => {
//     const ref = useRef();
//     const passwordRef = useRef();
//     const [form, setform] = useState({ site: "", username: "", password: "" })
//     const [passwordArray, setPasswordArray] = useState([])

//     useEffect(() => {
//         let passwords = localStorage.getItem("passwords")
//         if (passwords) {
//             setPasswordArray(JSON.parse(passwords))
//         }
//     }, [])
//     const showPassword = () => {
//         if (ref.current.src.includes("eye_cross.png")) {
//             ref.current.src = "eye.png"
//             passwordRef.current.type = "text"
//         } else {
//             ref.current.src = "eye_cross.png"
//             passwordRef.current.type = "password"
//         }
//     }

//     const savePassword = () => {
//         setPasswordArray([...passwordArray, {...form , id: uuidv4()}])
//         localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form , id: uuidv4()}]))
//         console.log([...passwordArray, {...form , id: uuidv4()}])
//         setform({ site: "", username: "", password: "" })
//     }

//     const deletePassword = (id) => {
//         let c = confirm("Do you really want to delete the password?")
//         if(c){
//             setPasswordArray(passwordArray.filter(item => item.id!==id))
//             localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id!==id)))
//             console.log(passwordArray.filter(item => item.id!==id))
//         }
//     }

//     const editPassword = (id) => {
//         setform(passwordArray.filter(i=>i.id === id)[0])
//         setPasswordArray(passwordArray.filter(item => item.id!==id))
//     }

//     const handleChnage = (e) => {
//         setform({ ...form, [e.target.name]: e.target.value })
//     }

//     const copyText = (text) => {
//         toast('Copied to clipboard!', {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//         });
//         navigator.clipboard.writeText(text)
//     }

//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//                 transition="Bounce"
//             />
//             {/* Same as */}
//             <ToastContainer />
//             <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#00ff00_100%)]"></div>

//             <div className="mycontainer">
//                 <h1 className='text-4xl font-bold text-center'>
//                     <span className="text-green-500 text-2xl">&lt;</span>
//                     Pass
//                     <span className="text-green-500 text-2xl ">OP/&gt;</span>
//                 </h1>
//                 <p className='text-green-900 text-lg text-center'>Your own password manager</p>
//                 <div className="flex flex-col p-4 text-black gap-8 items-center">
//                     <input value={form.site} onChange={handleChnage} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' />
//                     <div className="flex w-full gap-3">
//                         <input value={form.username} onChange={handleChnage} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' />
//                         <div className="relative">
//                             <input ref={passwordRef} value={form.password} onChange={handleChnage} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' />
//                             <span className='absolute right-1 top-1.5 cursor-pointer' onClick={showPassword}>
//                                 <img ref={ref} src="/eye_cross.png" width={20} alt="" />
//                             </span>
//                         </div>
//                     </div>
//                     <button onClick={savePassword} className='flex text-black border border-green-900 gap-2 justify-center items-center bg-green-400 rounded-full px-4 py-2 w-fit hover:bg-green-300'>
//                         <lord-icon
//                             src="https://cdn.lordicon.com/jgnvfzqg.json"
//                             trigger="hover">
//                         </lord-icon>
//                         Save Password</button>
//                 </div>

//                 <div className="passwords">
//                     <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
//                     {passwordArray.length === 0 && <div>No passwords to show</div>}
//                     {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
//                         <thead className='bg-green-800 text-white'>
//                             <tr>
//                                 <th className='py-2'>Site URL</th>
//                                 <th className='py-2'>Username</th>
//                                 <th className='py-2'>Password</th>
//                                 <th className='py-2'>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className='bg-green-100'>
//                             {passwordArray.map((item, index) => {
//                                 return <tr key={index}>
//                                     <td className='border border-white py-2 text-center'>
//                                         <div className="flex items-center justify-center">
//                                             <a href={item.site} target='_blank'>{item.site}</a>
//                                             <div className='size-7 cursor-pointer lordiconcopy ' onClick={() => { copyText(item.site) }}>
//                                                 <lord-icon
//                                                     src="https://cdn.lordicon.com/depeqmsz.json"
//                                                     trigger="hover"
//                                                     style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "padding": "3px" }}>
//                                                 </lord-icon>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className='border border-white py-2 text-center'>
//                                         <div className="flex items-center justify-center">
//                                         <span>{item.username}</span>
//                                             <div className='size-7 cursor-pointer lordiconcopy ' onClick={() => { copyText(item.username) }}>
//                                                 <lord-icon
//                                                     src="https://cdn.lordicon.com/depeqmsz.json"
//                                                     trigger="hover"
//                                                     style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "padding": "3px" }}>
//                                                 </lord-icon>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className='border border-white py-2 text-center '>
//                                         <div className="flex items-center justify-center">
//                                         <span>{item.password}</span>
//                                             <div className='size-7 cursor-pointer lordiconcopy ' onClick={() => { copyText(item.password) }}>
//                                                 <lord-icon
//                                                     src="https://cdn.lordicon.com/depeqmsz.json"
//                                                     trigger="hover"
//                                                     style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "padding": "3px" }}>
//                                                 </lord-icon>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className='border border-white py-2 text-center '>
//                                         <span className='cursor-pointer mx-1' onClick={() => {editPassword(item.id)}}>
//                                             <lord-icon
//                                                 src="https://cdn.lordicon.com/xaubpxfc.json"
//                                                 trigger="hover"
//                                                 style={{ "width": "25px", "height": "25px" }}>
//                                             </lord-icon>
//                                         </span>
//                                         <span className='cursor-pointer mx-1' onClick={() => {deletePassword(item.id)}}>
//                                             <lord-icon
//                                                 src="https://cdn.lordicon.com/skkahier.json"
//                                                 trigger="hover"
//                                                 style={{ "width": "25px", "height": "25px" }}>
//                                             </lord-icon>
//                                         </span>
//                                     </td>
//                                 </tr>
//                             })}
//                         </tbody>
//                     </table>}
//                 </div>
//             </div>

//         </>
//     )
// }

// export default Manager




















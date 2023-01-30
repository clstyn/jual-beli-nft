import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'
import GambarDummy from '../assets/dummy.jpg'

export const CreateNFT = () => {
    useGlobalState('modal')
    const [modal] = useGlobalState('modal')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [imgBase64, setImgBase64] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title || !description || !price) return
        console.log("Minted..")

        resetForm()
    }

    const resetForm = () => {
        setTitle('')
        setDescription('')
        setPrice('')
        setImgBase64(null)
        setFileUrl('')
    }

    const closeModal = () => {
        
        setGlobalState('modal', 'scale-0');
        resetForm();
    }
    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition ${modal}`}>
            <div className="bg-indigo-700 shadow-xl shadow-pink-800 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form action="" className="flex flex-col">
                    <div className="flex justify-between">
                        <p className="font-semibold text-white">Add Your NFT</p>
                        <button type="button" className="border-0 bg-transparent focus:outline-none text-white" onClick={closeModal}>
                            <FaTimes/>
                        </button>
                    </div>

                    <div className='flex items-center justify-center rounded-xl mt-5'>
                        <div className='shrink-0 rounded-xl overflow-hidden h-20 w-20 '>
                            <img className="h-full w-full object-cover cursor-pointer" src={imgBase64 || GambarDummy} alt="NFT" />
                        </div>
                    </div>

                    <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                        <label className="block" htmlFor="">
                            <span className='sr-only'>
                                Choose Profile Photo
                            </span>
                            <input type="file" name="" id="" accept='image/png, image/gif, image/jpeg, image/jpg, image/webp'
                            className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold hover:file:bg-pink-700 
                            hover:file:text-white  cursor-pointer focus:ring-0 transition-all' 
                            required
                            // onChange={changeImage}
                            />
                        </label>
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5">
                        <input
                        className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0 pl-4 py-2"
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                        />
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5 ">
                        <input
                        className="block w-full text-sm
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0 pl-4 py-2"
                        type="number"
                        step={0.01}
                        min={0.01}
                        name="price"
                        placeholder="Price (Eth)"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required
                        />
                    </div>

                    <div className="flex flex-row justify-between items-center bg-gray-800 rounded-md mt-5">
                        <textarea
                        className="block w-full text-sm resize-none
                            text-slate-500 bg-transparent border-0
                            focus:outline-none focus:ring-0 h-20 pl-4 pt-2"
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="flex flex-row justify-center items-center
                        w-full text-white text-md bg-gradient-to-br from-[#00A6A6] to-[#F08700] py-2 px-5 rounded-full
                        drop-shadow-xl border border-transparent
                        hover:border hover:border-pink-800
                        focus:outline-none focus:ring mt-5"
                    >
                        Mint Now
                    </button>
                </form>
            </div>
        </div>
    )
}
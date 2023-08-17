'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'

export default function Home() {
  const router=useRouter()
  const [items,setItems]=useState([])
  const [searchInput,setSearchInput]=useState(<></>)
  const [loading,setLoading]=useState(<p className='text-center text-3xl font-semibold'>Just a Moment...</p>)

  const fetchItems=async()=>{
    try{
      const url =`https://hp-api.onrender.com/api/characters`
      const response=await fetch(url,{
        method:"GET"
      })
      const parseRes=await response.json()
      setItems(parseRes)
      setLoading(<></>)
      setSearchInput(<>
       <Link href='/' className='font-semibold text-4xl my-8 md:ml-24 text-left max-sm:text-center w-full'>Harry Potter Characters</Link>
       <input type="text" onChange={(e:any)=>handleSearch(e,parseRes)} name="search" className='mt-4 mb-8 rounded-lg w-[270px] md:w-[70vw] border-[1px] text-gray-800 placeholder:text-gray-500 p-2' placeholder='Search for a character' id="search" />
      </>)
    }catch(error:any){
      console.log(error.message)
      setLoading(<>
      <p className='text-center text-red-500 text-3xl font-semibold'>{error.message}</p>
      <button
        className='mt-2 w-[100px] h-[40px] flex justify-center items-center bg-black text-white rounded-lg'
        onClick={
          () => window.location.reload()
        }
      >
        Try again
      </button>
      </>)
    }
  }

  let searchItems:any=[]
  const handleSearch=(e:any,par:any)=>{
    const searchterm=`${e.target.value.slice(0,1).toUpperCase()}${e.target.value.slice(1,e.target.value.lenght)}`
    par.forEach((item:any)=>{
      if(item.name.includes(searchterm)){
        searchItems.push(item)
        setItems(searchItems)
      }
    })
  }
/* eslint-disable */
  useEffect(()=>{
    fetchItems()
  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      {searchInput}
      {loading}
     <div className="md:grid lg:grid-cols-4 gap-[30px] max-md:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center" >
      {items?items.map((item:any)=>(
        <Link href={`/characters/${item.id}`} className='flex w-[270px]  flex-col justify-center cursor-pointer shadow-lg rounded-lg border-[1px] border-gray-100' key={item.id}>
          <Image
            src={`${item.image}`}
            width={270}
            height={230}
            alt={item.name}
            className='h-[380px] w-full rounded-t-lg'
          />
          <div className="ml-6 my-2 text-lg" id={item.id}>
            <p>Name: {item.name}</p>
            <p>{item.dateOfBirth===null?"no DoB":item.dateOfBirth}</p>
          </div>
        </Link>
      )):(
        <>
          <div className='text-xl'>Error: Failed to Fetch, try again</div>
          <button className="bg-black text-white w-[100px] h-[35px] rounded-[50px] flex justify-center items-center mt-6" onClick={()=>window.location.reload()}>Go Back</button>
        </>
      )}
     </div>
    </main>
  )
}
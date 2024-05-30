"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { useMutation } from "convex/react";
  import { api } from "@/convex/_generated/api";
  import { useState } from "react";

const SearchFriend = () => {
    const addFriend = useMutation(api.firends.addFriend);
    const [userEmail, setUserEmail] = useState('');

    const handleSearch = async () => {
        await addFriend({userEmail: userEmail})
        .then(() => {
            console.log('Friend Request Sent')
        })
        .catch((e) => {
            console.log(e)
        })
    }
  return (
    <AlertDialog >
        <AlertDialogTrigger className="flex items-center w-full justify-between px-4">
            <h6 className=' text-sm font-semibold'> Search Friend </h6>
            <Button variant={"outline"} className=' bg-slate-700 text-white'  size='sm' >Advance</Button>

        </AlertDialogTrigger>
        <AlertDialogContent className=" z-[999999]">
                <AlertDialogHeader>
                <AlertDialogTitle>Search Friend</AlertDialogTitle>
                <AlertDialogDescription>
                    <Input placeholder='Search Friend by email' onChange={(e) => setUserEmail(e.target.value)}/>
                 </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSearch}>Search</AlertDialogAction>
                </AlertDialogFooter>
        </AlertDialogContent>

    </AlertDialog>
  )
}

export default SearchFriend

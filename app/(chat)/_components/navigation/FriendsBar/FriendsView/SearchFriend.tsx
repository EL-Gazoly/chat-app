"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { set } from "zod";

const SearchFriend = () => {
  const addFriend = useMutation(api.firends.addFriend);
  const [userEmail, setUserEmail] = useState('');
  const [open, setOpen] = useState(false);

  const handleSearch = async () => {
    await addFriend({ userEmail: userEmail })
      .then(() => {
        toast.success('Friend Request Sent');
        setOpen(false);
      })
      .catch((e) => {
        console.log(e);
        let messsage = e.message.split('Uncaught Error:')[1];
        messsage = messsage.split('at')[0];
        toast.error(messsage);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center w-full justify-between px-4">
        <h6 className='text-sm font-semibold'> Search Friend </h6>
        <Button variant={"outline"} className='bg-slate-700 text-white' size='sm'>Advance</Button>
      </DialogTrigger>
      <DialogContent className="z-[999999]">
        <DialogHeader>
          <DialogTitle>Search Friend</DialogTitle>
          <DialogDescription className="mt-2">
            <Input placeholder='Search Friend by email' onChange={(e) => setUserEmail(e.target.value)} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleSearch}>Search</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SearchFriend;

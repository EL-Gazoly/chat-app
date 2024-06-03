import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useDebounceCallback } from 'usehooks-ts'
import { useState } from 'react';
import { cn } from '@/lib/utils';
type PendingCardProps = {
  width: number
  friend: Friend
}

type Friend = {
  _id: Id<"friends">;
  _creationTime: number;
  friendRequest: string;
  userId: string;
  friendId: string;
  status: string;
}

export const PendingCard = ({ width, friend }: PendingCardProps) => {
  const id = friend.userId as Id<"users">;
  const user = useQuery(api.users.getUserById, { id: id });
  const acceptFriendRequest = useMutation(api.firends.accpetFriendRequest);
  const declineFriendRequest = useMutation(api.firends.rejectFriendRequest);
  const [disabled, setDisabled] = useState(false);
  const handleAccept = () => {
    if (disabled) return;
    setDisabled(true);
    acceptFriendRequest({ friendRequest: friend._id, friendId: id });
  }
  const handleAcceptDebounced = useDebounceCallback(handleAccept, 1000);


  const handleDecline = () => {
    if (disabled) return;
    setDisabled(true);
    declineFriendRequest({ friendRequest: friend._id });
  }
  const handleDeclineDebounced = useDebounceCallback(handleDecline, 1000);

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex items-center gap-x-3 px-2'>
        <Avatar className='w-12 h-12 rounded-xl'>
          <AvatarImage className='w-12 h-12 rounded-xl' src={user?.imageUrl} />
          <AvatarFallback className='w-12 h-12 rounded-xl bg-red-100'>
            {user?.username[0]}
          </AvatarFallback>
        </Avatar>
        <span className='text-black line-clamp-1 text-sm font-semibold'>{user?.username}</span>
      </div>
      {width > 315 && (
        <div className='flex items-center gap-x-4'>
          <div role='button' onClick={handleAcceptDebounced} className={cn('flex items-center justify-center w-9 h-9 rounded-full bg-green-300/60', disabled && " bg-gray-200")}>
            <CheckIcon className={cn('w-6 h-6 text-green-800', disabled && " text-gray-400"  )}/>
          </div>
          <div role='button' onClick={handleDeclineDebounced} className={cn('flex items-center justify-center w-9 h-9 rounded-full bg-red-300/60', disabled && " bg-gray-200")}>
            <Cross1Icon className={cn('w-4 h-4 text-red-800', disabled && " text-gray-400")} />
          </div>
        </div>
      )}
    </div>
  )
}

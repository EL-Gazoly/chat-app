import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { PendingCard } from './PendingCard';
import { FriendCard } from './FriendCard';

const FriendsView = ({ width }: { width: number }) => {
    const friends = useQuery(api.firends.getFriends, {});
    const pendingFriends = friends?.filter((friend) => friend.status === "pending");
    const acceptedFriends = friends?.filter((friend) => friend.status === "accepted");


    return (
        <div className='flex flex-col mt-5 px-4 gap-y-7'>
            <div className='flex flex-col gap-y-4'>
                <h6 className='text-muted-foreground text-sm font-bold line-clamp-1'> Pending Friends </h6>
                {
                    pendingFriends?.length === 0 && (
                        <span className='text-muted-foreground text-sm px-2 font-medium line-clamp-1'>
                            No pending friend requests
                        </span>
                    )
                }
                {
                    pendingFriends?.map((friend) => (
                        <PendingCard key={friend.userId} width={width} friend={friend} />
                    ))
                }
            </div>
            <div className='flex flex-col gap-y-4'>
                <h6 className='text-muted-foreground text-sm font-bold line-clamp-1'> Friends </h6>
                {
                    acceptedFriends?.length === 0 && (
                        <span className='text-muted-foreground text-sm font-medium line-clamp-1'>
                            Add a friend to get started
                        </span>
                    )
                }
                {
                    acceptedFriends?.map((friend) => (
                        <FriendCard key={friend.userId} friend={friend} />
                    ))
                }
            </div>
        </div>
    );
}

export default FriendsView;

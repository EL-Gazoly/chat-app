import PlusIcon from '@/assets/chat/add.svg';
import ArrowDown from '@/assets/chat/arrowDown.svg'
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import UserCard from './UserCard';

type NavigationFriendsBarProps = {
    width: number;
    setHideToggle?:  React.Dispatch<React.SetStateAction<boolean>>
}
const NavigationFriendsBar = ({width} : NavigationFriendsBarProps) => {
    return ( 
        <div className={cn(" pt-12 flex-1 px-6 pb-6 flex flex-col gap-y-10 ",
                width > 307 ? ' bg-white' : ' bg-[#EDF2F7]'
            )}>
            <div className={cn(' flex items-center',
                    width > 307 ? ' justify-between'  : ' justify-center'
                )}>
                { width > 307 && 
                <div className=' flex items-center gap-x-2 text-xl font-semibold'>
                        <span>Messages</span>
                        <Image src={ArrowDown} alt="arrow" className="w-4 h-4" />
                    </div>
                }
                    <Image src={PlusIcon} alt="plus" className="cursor-pointer" />
                </div>
                    <div className=' w-full flex flex-col gap-y-3'>
                        { 
                        width > 345 &&
                            <div className=' px-2 w-full'>
                                <Input placeholder="Search messages" className=' w-full bg-[#F3F3F3] rounded-xl border border-none placeholder:text-[#929292]' />

                            </div>
                        }
                        <UserCard width={width} />
                        <UserCard width={width} />
                        <UserCard width={width} />
                        <UserCard width={width} />
                        <UserCard width={width} />
                        <UserCard width={width} />
                        <UserCard width={width} />
                        <UserCard width={width} />
                    <div>
                            
                </div>
            </div>
        </div>
     );
}
 
export default NavigationFriendsBar;
"use client";
import PlusIcon from '@/assets/chat/add.svg';
import ArrowDown from '@/assets/chat/arrowDown.svg'
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ChatsView from './ChatsView';
import FriendsView from './FriendsView/FriendsView'
import { Button } from '@/components/ui/button';
import SearchFriend from './FriendsView/SearchFriend';



type NavigationFriendsBarProps = {
    width: number;
    setHideToggle?:  React.Dispatch<React.SetStateAction<boolean>>
}
const NavigationFriendsBar = ({width} : NavigationFriendsBarProps) => {
    const tab = useSelector((state: RootState) => state.tabs.tab)
    
    
    return ( 
        <div className={cn(" overflow-y-auto h-full pt-12 flex-1 pl-4 pb-6 flex flex-col gap-y-10 ",
                 ' bg-white'
            )}>
            <div className={cn(' flex items-center',
                    width > 307 ? ' justify-between'  : ' justify-center'
                )}>
                { width > 307 && 
                <div className=' flex items-center gap-x-2 text-xl font-semibold ml-3'>
                        <span>Messages</span>
                        <Image src={ArrowDown} alt="arrow" className="w-4 h-4" />
                    </div>
                }
                    <Image src={PlusIcon} alt="plus" className="cursor-pointer mr-2" />
                </div>
                    <div className=' w-full flex flex-col gap-y-3'>
                        { 
                        width > 345 &&
                          <SearchFriend />
                        }
                        {
                            tab === 'MESSAGE' ? 
                            <ChatsView width={width} /> 
                            :
                            <FriendsView width={width} />
                        }
                    <div>
                            
                </div>
            </div>
        </div>
     );
}
 
export default NavigationFriendsBar;
"use client";
import PlusIcon from '@/assets/chat/add.svg';
import ArrowDown from '@/assets/chat/arrowDown.svg';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch} from '@/store/store';
import ChatsView from './ChatsView';
import FriendsView from './FriendsView/FriendsView';
import SearchFriend from './FriendsView/SearchFriend';
import { setTab } from "@/store/TabSlice";

type NavigationFriendsBarProps = {
  width: number;
  setHideToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  extend?: () => void;
}

const NavigationFriendsBar = ({ width, extend }: NavigationFriendsBarProps) => {
  const tab = useSelector((state: RootState) => state.tabs.tab);
  const dispatch = useDispatch<AppDispatch>();
    const SelectAFriend = () => {
        extend && extend()
        dispatch(setTab("FRIENDS"));
        
    }

  return ( 
    <div className={cn("overflow-y-auto h-full pt-12 flex-1 pl-4 pb-6 flex flex-col gap-y-10", 'bg-white')}>
      <div className={cn('flex items-center', width > 307 ? 'justify-between' : 'justify-center')}>
        {width > 307 && (
          <div className='flex items-center gap-x-2 text-xl font-semibold ml-3'>
            <span>Messages</span>
            <Image src={ArrowDown} alt="arrow" className="w-4 h-4" />
          </div>
        )}
        <Image src={PlusIcon} alt="plus" className="cursor-pointer mr-2" onClick={SelectAFriend} />
      </div>
      <div className='w-full flex flex-col gap-y-3'>
        {width > 345 && <SearchFriend />}
        {tab === 'MESSAGE' ? <ChatsView width={width} /> : <FriendsView width={width} />}
        <div></div>
      </div>
    </div>
  );
}

export default NavigationFriendsBar;

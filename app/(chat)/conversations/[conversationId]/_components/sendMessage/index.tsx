import AttachIcon from '@/assets/chat/attach.svg'
import SendIcon from '@/assets/chat/send.svg'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
const SendMessage = () => {
    return ( 
        <div className=" w-full p-6 flex items-center gap-x-6">
            <Image src={AttachIcon} alt="attach" className="cursor-pointer" />
            <div className=' w-full flex items-center justify-center rounded-xl px-5 border border-border'>
                <input type="text" placeholder="Type a message" className=" w-full  rounded-xl  focus:outline-none placeholder:text-[#929292] p-4" />
                <Image src={SendIcon} alt="send" className="cursor-pointer" />

            </div>
        </div>
     );
}
 
export default SendMessage;
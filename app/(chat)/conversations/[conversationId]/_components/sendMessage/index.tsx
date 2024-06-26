import SendIcon from '@/assets/chat/send.svg'
import Image from 'next/image'
import { use, useRef } from 'react'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import UploadFileModal from '../UploadFileModal'
const SendMessage = ({chatId, scrollToBottom, setMessage} : {chatId : string , scrollToBottom : () => void, setMessage : React.Dispatch<any>}) => {
    const messageRef = useRef<HTMLInputElement>(null)
    const sendMessage = useMutation(api.message.sendMessage)
    const handleSendMessage = async () => {
        if(!messageRef.current?.value) return
        await sendMessage({
            chatId: chatId,
            content: messageRef.current.value
        })
        messageRef.current.value = ''
        scrollToBottom()
        setMessage((prev : any) => [...prev, {
            content: messageRef?.current?.value,
            senderId: 'me'
        }])
    }

    return ( 
        <div className=" w-full p-6 flex items-center gap-x-6">
            <UploadFileModal />
            <div className=' w-full flex items-center justify-center rounded-xl px-5 border border-border'>
                <input ref={messageRef} type="text" placeholder="Type a message" className=" w-full  rounded-xl break-words  focus:outline-none placeholder:text-[#929292] p-4"
                onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        handleSendMessage()
                    }
                }}
                />
                <Image src={SendIcon} alt="send" className="cursor-pointer"  onClick={handleSendMessage}/>

            </div>
        </div>
     );
}
 
export default SendMessage;
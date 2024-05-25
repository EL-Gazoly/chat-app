import FileIcon from '@/assets/chat/file.svg';
import GalleryIcon from '@/assets/chat/gallery.svg';
import DocuemntIcon from '@/assets/chat/document.svg';
import ExcelIcon from '@/assets/chat/excel.svg';
import DownloadIcon from '@/assets/chat/download.svg'
import Image from 'next/image';
const Card = () => {
    return ( 
        <div className=" px-3 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
                <div className=' w-12 h-12 flex items-center justify-center rounded-xl bg-[#FFF5F5]'>
                    <Image src={FileIcon} alt="file" className=' w-6 h-6' />
                </div>
                <div className=" flex flex-col gap-y-1">
                    <span className=" text-sm font-semibold">File Name</span>
                    <div className=' flex items-center gap-x-[10px] text-[#00000066] text-xs font-medium'>
                        <span>PDF</span>
                        <span>1.2MB</span>

                    </div>

                </div>
            </div>
            <Image src={DownloadIcon} alt='download icon' className=' w-6 h-6' />
            
        </div>
     );
}
 
export default Card;
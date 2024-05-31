import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import Image from "next/image"


export const ImageModal = ({ image } : {image : string}) => {
    return (
        <Dialog>
            <DialogTrigger className="  w-full flex items-center justify-center">
                <Image src={image} alt="Image" width={300} height={150} />
            </DialogTrigger>
            <DialogContent className=" flex items-center justify-center p-0 bg-transparent border border-transparent">
                <Image src={image} alt="Image" width={ 800} height={800} />
            </DialogContent>
          
        </Dialog>
    )
}
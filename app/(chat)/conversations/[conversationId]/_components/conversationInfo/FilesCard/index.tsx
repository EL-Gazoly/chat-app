import Card from "./Card";

const FileCard = () => {
    return ( 
        <div className=" flex flex-col gap-y-5 px-4 overflow-y-auto">
            <div className=" flex items-center gap-x-2 text-sm font-semibold">
                <span>Files</span>
                <div className=" flex items-center justify-center rounded-full py-1 px-2 bg-[#EDF2F7]">
                    <span>4</span>
                </div>

            </div>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

        </div>
     );
}
 
export default FileCard;
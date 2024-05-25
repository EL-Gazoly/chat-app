import CoverImage from '@/assets/auth/cover.svg';
import MacDevice from '@/assets/auth/Macbook.svg';
import Image from 'next/image';

const AuthCover = () => {
    return ( 
        <div className=" hidden lg:block col-span-7 xl:col-span-8 w-full h-screen relative overflow-hidden">
            <Image src={CoverImage} alt="cover" className="w-full h-full object-cover z-10" quality={100} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-12 w-full h-full z-20">
                <Image src={MacDevice} alt="mac" className="object-contain w-[600px] h-[300] xl:w-[650px] xl:h-[400px] 2xl:w-[744px] 2xl:h-[483px]" />
                <div className="flex flex-col items-center justify-center gap-y-5 text-white font-bold">
                    <h3 className="text-4xl">Welcome to our community</h3>
                    <span className="text-[15px] text-center">Our popular community is full of benefits. You can join us immediately</span>
                    <div className="mt-2 flex justify-center items-center gap-x-[14px]">
                        <Dot className="w-10 h-2" />
                        <Dot className="w-[9px] h-[7px]" />
                        <Dot className="w-[9px] h-[7px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Dot = ({ className }: { className: string }) => <div className={`${className} bg-white rounded-3xl`} />;

export default AuthCover;
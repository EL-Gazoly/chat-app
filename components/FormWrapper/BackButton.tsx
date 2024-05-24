import Link from "next/link";
type BackButtonProps = {
    text: string;
    href: string;
    label: string;
};

const BackButton = ({ text, label, href }: BackButtonProps) => {
    return (
        <div className="mt-8 flex items-center text-center text-xs gap-x-1">
            <span>{text}</span>
            <Link href={href} className="text-link underline">{label}</Link>
        </div>
    );
};

export default BackButton;

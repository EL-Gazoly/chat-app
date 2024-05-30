import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FileIcon from '@/assets/chat/file.svg';
import GalleryIcon from '@/assets/chat/gallery.svg';
import DocumentIcon from '@/assets/chat/document.svg';
import ExcelIcon from '@/assets/chat/excel.svg';
import DownloadIcon from '@/assets/chat/download.svg';
import { ArrowDownToLine, FileText } from 'lucide-react';
import { Id } from '@/convex/_generated/dataModel';

type File = {
    _id: Id<"files">;
    _creationTime: number;
    chatId: string;
    url: string;
    type: string;
    senderId: string;
    createdAt: number;
    fileId: string;
    fileName: string;
    size: number;
}

type CardProps = {
    file: File
}

const fileTypes = [
    { type: 'application/pdf', icon: FileIcon, label: 'PDF', bgColor: '#FFF5F5' },
    { type: 'application/msword', icon: DocumentIcon, label: 'DOC', bgColor: '#F0FFF4' },
    { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', icon: DocumentIcon, label: 'DOCX', bgColor: '#F0FFF4' },
    { type: 'application/vnd.ms-excel', icon: ExcelIcon, label: 'XLS', bgColor: '#FAF5FF' },
    { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', icon: ExcelIcon, label: 'XLSX', bgColor: '#FAF5FF' },
    { type: 'text/csv', icon: ExcelIcon, label: 'CSV', bgColor: '#FAF5FF' },
    { type: 'image/jpeg', icon: GalleryIcon, label: 'JPEG', bgColor: '#F0FFF4' },
    { type: 'image/png', icon: GalleryIcon, label: 'PNG', bgColor: '#F0FFF4' },
    { type: 'image/gif', icon: GalleryIcon, label: 'GIF', bgColor: '#F0FFF4' },
    { type: 'video/mp4', icon: GalleryIcon, label: 'MP4', bgColor: '#F0FFF4' },
    { type: 'video/quicktime', icon: GalleryIcon, label: 'MOV', bgColor: '#F0FFF4' },
    { type: 'video/x-msvideo', icon: GalleryIcon, label: 'AVI', bgColor: '#F0FFF4' },
    { type: 'video/x-matroska', icon: GalleryIcon, label: 'MKV', bgColor: '#F0FFF4' },
    { type: 'text/plain', icon: FileText, label: 'Text', bgColor: '#F6F4F4' },
];

const Card = ({ file }: CardProps) => {
    const convertBytesToKB_OR_MB = (bytes: number | undefined) => {
        if (!bytes) return 0;
        const KB = bytes / 1024;
        if (KB < 1024) {
            return KB.toFixed(2) + 'KB';
        }
        const MB = KB / 1024;
        return MB.toFixed(2) + 'MB';
    };

    const getFileType = () => {
        const fileType = fileTypes.find(ft => ft.type === file.type);
        return fileType || { icon: FileIcon, label: 'Unknown', bgColor: '#E2E8F0' };
    };

    const fileType = getFileType();

    return (
        <Link href={file?.url} target="_blank" className="px-3 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl" style={{ backgroundColor: fileType.bgColor }}>
                   { fileType.label === "Text" ? <FileText size={24} className="w-6 h-6" /> :  <Image src={fileType.icon} alt={fileType.label} className="w-6 h-6" />}
                </div>
                <div className="flex flex-col gap-y-1">
                    <span className="text-sm font-semibold line-clamp-1 max-w-[200px]">{file.fileName}</span>
                    <div className="flex items-center gap-x-[10px] text-[#00000066] text-xs font-medium">
                        <span>{fileType.label}</span>
                        <span>{convertBytesToKB_OR_MB(file?.size)}</span>
                    </div>
                </div>
            </div>
            <Image src={DownloadIcon} alt="download icon" className="w-6 h-6" />
        </Link>
    );
};

export default Card;

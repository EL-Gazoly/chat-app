"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FileIcon from '@/assets/chat/file.svg';
import GalleryIcon from '@/assets/chat/gallery.svg';
import DocumentIcon from '@/assets/chat/document.svg';
import ExcelIcon from '@/assets/chat/excel.svg';
import { ArrowDownToLine, FileText } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { ImageModal } from './ImageModal';

const fileTypes = [
    { type: 'pdf', icon: FileIcon, label: 'PDF' },
    { type: 'doc', icon: DocumentIcon, label: 'DOC' },
    { type: 'docx', icon: DocumentIcon, label: 'DOC' },
    { type: 'xls', icon: ExcelIcon, label: 'CSV' },
    { type: 'xlsx', icon: ExcelIcon, label: 'CSV' },
    { type: 'csv', icon: ExcelIcon, label: 'CSV' },
    { type: 'jpg', icon: GalleryIcon, label: 'Image' },
    { type: 'jpeg', icon: GalleryIcon, label: 'Image' },
    { type: 'png', icon: GalleryIcon, label: 'Image' },
    { type: 'gif', icon: GalleryIcon, label: 'Image' },
    { type: 'mp4', icon: GalleryIcon, label: 'Video' },
    { type: 'mov', icon: GalleryIcon, label: 'Video' },
    { type: 'avi', icon: GalleryIcon, label: 'Video' },
    { type: 'mkv', icon: GalleryIcon, label: 'Video' },
    { type: 'txt', icon: FileText, label: 'Text' },
];

const FileLink = ({ content } : {content : string}) => {
    const getFileInfo = useQuery(api.files.getFile, { url: content });

    const getFileType = () => {
        for (let fileType of fileTypes) {
            if (content.includes(fileType.type)) {
                return fileType;
            }
        }
        return { icon: FileIcon, label: 'Unknown', type: 'unknown' };  // Default case
    };

    const fileType = getFileType();

    const convertBytesToKB_OR_MB = (bytes : number | undefined) => {
        if (!bytes) return 0;
        const KB = bytes / 1024;
        if (KB < 1024) {
            return KB.toFixed(2) + 'KB';
        }
        const MB = KB / 1024;
        return MB.toFixed(2) + 'MB';
    };

    const renderLinkContent = () => (
        <div className="max-w-[305px] flex items-center gap-x-3 p-2 rounded-lg transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            {fileType.type === "txt" ? <FileText size={24} className='w-10 h-10' /> : <Image src={fileType.icon} alt={fileType.label} className="w-10 h-10" />}
            <div className="flex flex-col">
                <span className="text-sm font-semibold line-clamp-1">{getFileInfo?.fileName}</span>
                <div className="flex items-center gap-x-2 text-gray-400 text-xs font-medium">
                    <span>{fileType.label}</span>
                    <span>{convertBytesToKB_OR_MB(getFileInfo?.size)}</span>
                </div>
            </div>
            <ArrowDownToLine size={24} className="ml-auto" />
        </div>
    );

    return (
        <div className="file-link-container">
            <Link href={content} target="_blank">
                {renderLinkContent()}
            </Link>
            {fileType.label === 'PDF' || fileType.label === 'Text' || fileType.label === "Video" ? (
                <div className="file-preview mt-4 flex items-center justify-center w-full">
                    <iframe src={content} className=' max-w-full'></iframe>
                </div>
            ) : ""}
            {fileType.label === 'Image' && <ImageModal image={content} />}
        </div>
    );
};

export default FileLink;

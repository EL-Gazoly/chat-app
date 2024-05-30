"use client";

import AttachIcon from '@/assets/chat/attach.svg';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MultiFileDropzone,
  type FileState,
} from '@/components/multipleUploadFile';
import { Button } from '@/components/ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { set } from 'zod';

const UploadFileModal = () => {
  const { conversationId } = useParams() as { conversationId: string };
  const [open, setOpen] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const uploadFile = useMutation(api.files.createFile);
  const sendMessage = useMutation(api.message.sendMessage);
  const [uploadRes, setUploadRes] = useState<
    {
      url: string;
      filename: string;
    }[]
  >([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const handelUploadFiles = async () => {
    await Promise.all(
      fileStates.map(async (fileState) => {
        try {
          if (fileState.progress !== 'PENDING') return;
          const res = await edgestore.publicFiles.upload({
            file: fileState.file,
            onProgressChange: async (progress) => {
              updateFileProgress(fileState.key, progress);
              if (progress === 100) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                updateFileProgress(fileState.key, 'COMPLETE');
              }
            },
          });
            setUploadRes((uploadRes) => [
                ...uploadRes,
                {
                url: res.url,
                filename: fileState.file.name,
                },
            ]);
          await uploadFile({
            chatId: conversationId,
            url: res.url,
            type: fileState.file.type,
            fileName: fileState.file.name,
            size: fileState.file.size,
          });
          await sendMessage({
            chatId: conversationId,
            content: res.url,
          })
          
          setOpen(false);
          


          
        } catch (err) {
          updateFileProgress(fileState.key, 'ERROR');
        }
      }),
    );
  };
  const resetAll = () => {
    setFileStates([]);
    setUploadRes([]);
    setOpen(!open);

  }

  return (
    <Dialog open={open} onOpenChange={resetAll} >
      <DialogTrigger>
        <Image src={AttachIcon} alt="attach" className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className=' z-[999999]'>
        <DialogHeader>
          <DialogTitle className='mb-5'>Upload File</DialogTitle>
          <DialogDescription className='w-full flex items-center justify-center'>
            <div className="flex flex-col items-center">
              <MultiFileDropzone
                value={fileStates}
                dropzoneOptions={{
                  maxFiles: 5,
                  maxSize: 1024 * 1024 * 1, // 1 MB
                }}
                onChange={setFileStates}
                onFilesAdded={async (addedFiles) => {
                  setFileStates([...fileStates, ...addedFiles]);
                }}
              />
              <Button
                className="mt-2"
                onClick={handelUploadFiles}
                disabled={
                  !fileStates.filter((fileState) => fileState.progress === 'PENDING').length
                }
              >
                Upload
              </Button>
              {uploadRes.length > 0 && (
                <div className="mt-2">
                  {uploadRes.map((res) => (
                    <a
                      key={res.url}
                      className="mt-2 block underline text"
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {res.filename}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFileModal;

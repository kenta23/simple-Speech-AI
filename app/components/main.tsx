'use client'


import { Copy, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import VoiceRecord from './voiceRecord';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { fire } from '../lib/confettiFunction';


export default function Main() {
    const [copySuccess, setCopySuccess] = useState(false);
    const [showImage, setShowImage] = useState<boolean>(false);
    const { data, error, isPending, mutate, isSuccess } = useMutation({
      mutationFn: async (item: FormData) => await axios.post(
       "/api/speech",
       item,
       {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       }
     ),
     onSuccess: (data) => {
        toast.success('Successful')
     },
     onError: (error) => console.log('Error:', error),
     onMutate: () => toast.loading('Transcribing...', {
       position: 'bottom-right',
       duration: 5000,
     }),
   }
 )

   async function saveAudio(blob: Blob) {
      try {
        const formData = new FormData();
        formData.append('audio', blob as File);
    
        
        mutate(formData, {
           onError: (error) => console.log(error),
           onSuccess: (data) => console.log('success', data),
        })
     
        // dispatch(addValue(text));
       } catch (error) {
         console.log(error);
       }
  }
    

    const copyToClipboard = async () => {
      try {
        if(!data?.data.transcription.text) navigator.clipboard.writeText('');

        await navigator.clipboard.writeText(data?.data.transcription.text);
        setCopySuccess(true);
       
        if(copySuccess) {
           toast.success('Copied to clipboard!');
        }
      } catch (err) {
        console.error('Failed to copy:', err);
        setCopySuccess(false);
      }
    };

    useEffect(() => {
         if(!data?.data) return;
  
         if(data.data.transcription.text.toString().trim().replace(/\s+/g, ' ').toLowerCase() === 'bading si erwin' ||
          data.data.transcription.text.toString().trim().replace(/\s+/g, ' ').toLowerCase() === 'bakla si erwin') {
           //show image 
           setShowImage(true);
              //activate confetti when text is bading si erwin
              fire(0.25, {
                spread: 26,
                startVelocity: 55,
              });
              fire(0.2, {
                spread: 60,
              });
              fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8
              });
              fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2
              });
              fire(0.1, {
                spread: 120,
                startVelocity: 45,
              });  

              setTimeout(() => {
                   setShowImage(false);
              }, 4000)
         }
    }, [data])
  

  return (
    <div className="flex  w-full px-[25px] md:py-0 py-12 md:px-[55px] lg:px-[75px] h-auto flex-col md:flex-row md:gap-[50px] lg:gap-[67px] items-center justify-between">
      {/**HEADLINE */}
      <div className="flex flex-col gap-4 w-full text-center md:text-left md:max-w-[50%]">
        <h1 className="text-blue-600 font-normal leading-snug text-[40px] sm:text-[45px] md:text-[60px] lg:text-[75px] break-words ">
          Translating your{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 bg-clip text-transparent bg-clip-text">
            voice
          </span>{" "}
          into story
        </h1>
        <p className="text-md sm:text-[22px] md:text-[24px] lg:text-[27px] text-light text-red-400">
          Try to record your voice{" "}
        </p>
      </div>

      <div className="w-full relative lg:w-[40%] h-[550px] flex items-center px-6 ">
        <div className="w-full relative h-[500px] border rounded-lg shadow-lg px-4 py-3">
          {/**TEXT TRANSCRIBED HERE.... */}
          <div className="w-full self-center text-wrap break-words max-h-[400px] flex items-center overflow-y-auto">
           { isPending && <Loader2 size={24} className='animate-spin  text-[#ca75b8]'/> }
             {isSuccess && !isPending ? 
              <span className="max-h-full font-medium text-[#393457]">{data.data.transcription.text}</span> 
              : !isPending && <span className="max-h-full font-medium text-[#c8c8ca]">do something....</span>
            }
          </div>

             {showImage && 
               <div className="image-container shadow-lg shadow-pink-600">
                    <Image src="/erwin.jpg" priority  width={170} height={160} alt="Your Image" className="object-cover" />
              </div>
              }

          <div className="absolute px-4 flex  items-center justify-between bottom-4 right-3">
            <Copy size={28} className="text-slate-500 cursor-pointer " onClick={copyToClipboard}/>
          </div>

          <div className="absolute px-4 flex  items-center justify-between bottom-4 left-3">
            <VoiceRecord saveAudio={saveAudio} />
          </div>
        </div>
      </div>
    </div>
  );
}

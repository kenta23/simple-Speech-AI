import { HfInference } from "@huggingface/inference";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { streamToBuffer } from "@/app/lib/savedAudio";


const hf = new HfInference(process.env.HF_ACCESS_TOKEN, {
    use_cache: true
});


export async function POST(req: NextRequest, res: NextApiResponse) {
    try {
         const data = await req.formData();
         const file: File | null = data.get('audio') as unknown as File;

         if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
         }

        const bytes =  await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

       /* const folder = '/tmp/audio';
        const filepath = path.join(folder, file.name);

        //creating new file inside /tmp/audio directory
        fs.writeFileSync(filepath, buffer);
        const audio = await streamToBuffer(fs.createReadStream(filepath)); //read the file  */

        const transcription = await hf.automaticSpeechRecognition({
            data: buffer,
            model: 'openai/whisper-large-v3',    
        });
        //fs.unlinkSync(filepath);

        return NextResponse.json({ transcription }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
   
}



'use client'


import React from 'react'
import { AudioRecorder } from 'react-audio-voice-recorder'

export default function VoiceRecord({ saveAudio }:  { saveAudio: (blob: Blob) => void }) {
  return (
    <div>
        <AudioRecorder
         onRecordingComplete={(blob) => saveAudio(blob)}
         audioTrackConstraints={{
          noiseSuppression: true,
          autoGainControl: true,
          echoCancellation: true,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
      />
    </div>
  )
}

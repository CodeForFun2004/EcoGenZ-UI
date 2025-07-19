// Utility functions for audio processing

export const convertAudioToWav = async (audioBlob: Blob): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const fileReader = new FileReader();

        fileReader.onload = async (event) => {
            try {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                // Convert to WAV format
                const wavBlob = audioBufferToWav(audioBuffer);
                resolve(wavBlob);
            } catch (error) {
                reject(error);
            }
        };

        fileReader.onerror = reject;
        fileReader.readAsArrayBuffer(audioBlob);
    });
};

const audioBufferToWav = (buffer: AudioBuffer): Blob => {
    const length = buffer.length;
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
    const view = new DataView(arrayBuffer);

    // WAV header
    const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * numberOfChannels * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * numberOfChannels * 2, true);

    // Convert audio data
    let offset = 44;
    for (let i = 0; i < length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
            const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
            view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
            offset += 2;
        }
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
};

export const createAudioFile = (audioBlob: Blob, filename: string = 'voice-message.wav'): File => {
    return new File([audioBlob], filename, { type: 'audio/wav' });
};

export const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getAudioDuration = (audioBlob: Blob): Promise<number> => {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        const url = URL.createObjectURL(audioBlob);

        audio.addEventListener('loadedmetadata', () => {
            URL.revokeObjectURL(url);
            resolve(audio.duration);
        });

        audio.addEventListener('error', () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load audio'));
        });

        audio.src = url;
    });
};

// Utility to handle AI audio response
export const processAIAudioResponse = async (audioBlob: Blob): Promise<{
    audioUrl: string;
    duration: string;
}> => {
    const audioUrl = URL.createObjectURL(audioBlob);
    const duration = await getAudioDuration(audioBlob);

    return {
        audioUrl,
        duration: formatDuration(duration)
    };
};

// Clean up audio URLs to prevent memory leaks
export const cleanupAudioUrl = (audioUrl: string): void => {
    if (audioUrl && audioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(audioUrl);
    }
}; 
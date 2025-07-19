import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button, message } from 'antd';
import { AudioOutlined, StopOutlined, LoadingOutlined } from '@ant-design/icons';
import './VoiceRecorder.css';

interface VoiceRecorderProps {
    onAudioRecorded: (audioBlob: Blob) => void;
    isRecording: boolean;
    setIsRecording: (recording: boolean) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
    onAudioRecorded,
    isRecording,
    setIsRecording,
}) => {
    const [isSupported, setIsSupported] = useState<boolean>(true);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    // Kiểm tra hỗ trợ MediaRecorder
    useEffect(() => {
        if (!navigator.mediaDevices || !window.MediaRecorder) {
            setIsSupported(false);
            message.error('Trình duyệt của bạn không hỗ trợ thu âm');
        }
    }, []);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                onAudioRecorded(audioBlob);

                // Dừng stream
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            message.success('Bắt đầu thu âm...');
        } catch (error) {
            console.error('Lỗi khi bắt đầu thu âm:', error);
            message.error('Không thể truy cập microphone');
        }
    }, [onAudioRecorded, setIsRecording]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsProcessing(true);
            message.info('Đang xử lý audio...');
        }
    }, [isRecording, setIsRecording]);

    const handleRecordingClick = useCallback(() => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }, [isRecording, startRecording, stopRecording]);

    if (!isSupported) {
        return (
            <div className="voice-recorder-error">
                <p>Trình duyệt không hỗ trợ thu âm</p>
            </div>
        );
    }

    return (
        <div className="voice-recorder">
            <Button
                type="primary"
                shape="circle"
                size="large"
                icon={
                    isProcessing ? (
                        <LoadingOutlined />
                    ) : isRecording ? (
                        <StopOutlined />
                    ) : (
                        <AudioOutlined />
                    )
                }
                onClick={handleRecordingClick}
                disabled={isProcessing}
                className={`voice-record-button ${isRecording ? 'recording' : ''} ${isProcessing ? 'processing' : ''}`}
                title={isRecording ? 'Dừng thu âm' : 'Bắt đầu thu âm'}
            />
            {isRecording && (
                <div className="recording-indicator">
                    <div className="pulse-dot"></div>
                    <span>Đang thu âm...</span>
                </div>
            )}
            {isProcessing && (
                <div className="processing-indicator">
                    <span>Đang xử lý...</span>
                </div>
            )}
        </div>
    );
};

export default VoiceRecorder; 
export interface RefObject {
    current: HTMLVideoElement | null
}

export interface ControlProps{
    videoRef: RefObject;
}
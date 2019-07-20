import * as React from 'react';

export interface IFileIconProps {
    extension?: string;
    mimeType: string;
    width?: number;
    height?: number;
}

const FileIcon = (props: IFileIconProps) => {
    if(!props.mimeType) props.mimeType = 'unknown';
    if(!props.width) props.width = 40;
    if(!props.height) props.height = props.width;
    return (
        <img src={getFileIconPath(props.mimeType)} width={props.width} height={props.height}/>
    )
}

export default FileIcon;

function getFileIconPath(mimeType: string) {
    const imgRoot = '/images/'
    switch(mimeType.toLowerCase()) {

        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return `${imgRoot}xlsx.svg`
            break;
        
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return `${imgRoot}pptx.svg`
            break;

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return `${imgRoot}docx.svg`
            break;

        case 'application/msonenote':
            return `${imgRoot}one.svg`
            break;

        case 'application/pdf':
            return `${imgRoot}pdf.svg`
            break;

        default:
            return `${imgRoot}/txt.svg`
    }
}
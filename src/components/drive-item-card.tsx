import * as React from 'react';
import FileIcon from './file-icon';

export interface IDriveItem {
    id?: string,
    name?: string,
    webUrl?: string,
    file: IFile,
    [key: string]: any;
}

export interface IFile {
    mimeType?: string;
}

export interface IDriveItemCardProps {
    driveItem: IDriveItem;
}

export default function DriveItemCard(props: IDriveItemCardProps): React.ReactElement {
    const di = props.driveItem;
    return (
        <div className="card horizontal">
            
            <div className="card-image">
                <FileIcon mimeType={di.file.mimeType} />
            </div>
            <div className="card-stacked">
            <div className="card-title">{ di.name }</div>
            <div className="card-content">
                <ul>
                    <li><b>Created: </b>{ di.fileSystemInfo.createdDateTime} </li>
                    <li><b>Last Modified: </b>{ di.fileSystemInfo.lastModifiedDateTime} </li>
                </ul>
            </div>
            <div className="card-action">
                <a href={di.webUrl}>Open</a>
            </div>
            </div>
        </div>
    )
}


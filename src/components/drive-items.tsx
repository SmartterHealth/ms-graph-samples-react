import * as React from 'react'
import { FileIcon } from './file-icon';


interface IDriveItem {
    id?: string,
    name?: string,
    webUrl?: string,
    file: IFile,
    [key: string]: any;
}

interface IFile {
    mimeType?: string;
}

interface IDriveItemCardListProps {
    driveItems: IDriveItem[];
}

function DriveItemCardList(props: IDriveItemCardListProps) {
    const listItems = props.driveItems.map((driveItem, index) => {
        return <DriveItemCard driveItem={driveItem }/>
    });

    let template = null;
    if(props.driveItems && props.driveItems.length > 0) {
        return <div> { listItems } </div>
    } else {
        return <div className="center-align"><img src="/images/onedrive.png" width="100"/><h4>Loading... please wait.</h4></div>
    }

}

interface IDriveItemCardProps {
    driveItem: IDriveItem;
}

function DriveItemCard(props: IDriveItemCardProps): React.ReactElement {
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

export { DriveItemCardList, DriveItemCard, IDriveItem }
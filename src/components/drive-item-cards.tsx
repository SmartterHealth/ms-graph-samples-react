import * as React from 'react'
import  FileIcon  from './file-icon';
import DriveItemCard, { IDriveItem, IDriveItemCardProps, IFile } from './drive-item-card';


export { IDriveItem, IDriveItemCardProps, IFile }

interface IDriveItemCardListProps {
    driveItems: IDriveItem[];
}

export default function DriveItemCardList(props: IDriveItemCardListProps) {
    const listItems = props.driveItems.map((driveItem, index) => {
        return <DriveItemCard driveItem={driveItem }/>
    });

    let template = null;
    if(props.driveItems && props.driveItems.length > 0) {
        return <div> { listItems } </div>
    } else {
        return <div className="center-align"><img src="/images/onedrive.png" width="100"/><h4>0 items returned.</h4></div>
    }

}

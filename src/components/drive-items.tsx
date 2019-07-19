import * as React from 'react'


interface IDriveItem {
    id?: string,
    name?: string,
    webUrl?: string
    [key: string]: any;
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
        return <h3>Loading... please wait.</h3>
    }

}

interface IDriveItemCardProps {
    driveItem: IDriveItem;
}

function DriveItemCard(props: IDriveItemCardProps): React.ReactElement {
    const di = props.driveItem;
    return (
        <div className="card">
            
            <div className="card-image"><img src="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product-fluent/svg/word_48x1.svg" width="48" height="48"/></div>
            <div className="card-title">{ di.name }</div>
            <div className="card-content">

            </div>
            <div className="card-action">
                <a href={di.webUrl}>Open</a>
            </div>
        </div>
    )
}

export { DriveItemCardList, DriveItemCard, IDriveItem }
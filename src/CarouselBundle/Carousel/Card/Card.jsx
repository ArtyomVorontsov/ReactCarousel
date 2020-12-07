import React from 'react'
import classes from "./Styles/Card.module.css"



export const CustomCardComponent = (props) => {
    return (
        <div /* Card wrapper */ id={props.id} >
            <div /* Card */>

            </div>
        </div>
    )
}

export const UserCard = (props) => {
    return (
        <div id={props.id} className={classes.userCardWrapper}>
            <div className={classes.userCard}>
                {/* Modify only inside classes.userCard */}
                <div className={classes.userpicWrapper}>
                    <img style={{ userSelect: "none" }} draggable="false" className={classes.userpic} src={props.picture} className={classes.userpicSkeleton} />
                </div>
                <div className={classes.personalInfoWrapper}>
                    <div className={classes.usernameSkeleton}></div>
                    <div className={classes.personalInfoSkeleton}></div>
                </div>

            </div>
        </div>
    )
}



export const PhotoCard = (props) => {
    return (
        <div id={props.id} className={classes.photoCardWrapper}>
            <div className={classes.photoCard}>
                {/* Modify only inside classes.photoCard */}
                <img draggable="false" className={classes.userpic} src={props.picture} className={classes.userpicSkeleton} />
            </div>
        </div>
    )
}


export const FullScreenCard = (props) => {
    return (
        <div id={props.id} className={classes.fullScreenCardWrapper}>
            <div className={classes.fullScreenCard}>
                {/* Modify only inside classes.fullScreenCard */}
                <img draggable="false" src={props.picture} alt="card" />
            </div>
        </div>
    )
}




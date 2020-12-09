import React from 'react'
import classes from './Styles/PaginationDots.module.css'

export const PaginationDots = ({ isFakeElements, elements, currentCard, setPrevCard, setNextCard, isInfinite }) => {


    const transitionLogic = (index) => {

        if (isInfinite) {

            let toNextDistance = index - currentCard;
            let toPrev;
            let toNext;

            if (toNextDistance > 0) {

                toPrev = (elements.length + currentCard) - index;
                toNext = index - currentCard;
                if (toPrev > toNext) {
                    setNextCard(toNext)
                } else {
                    setPrevCard(toPrev)
                }
            } else {
                toPrev = currentCard - index
                toNext = index + (elements.length - currentCard);

                if (toPrev < toNext) {
                    setPrevCard(toPrev)
                } else {
                    setNextCard(toNext)
                }
            }

        } else {
            if (currentCard > index) {
                setPrevCard(currentCard - index)
            } else {
                setNextCard(index - currentCard)
            }
        }

    }




    let paginatorDots = elements.map((element, index) => {
        return <div key={index} id={index} onClick={() => transitionLogic(index)} className={classes.paginatorDotWrapper}>
            <div className={index === currentCard ? classes.paginatorDotSelected : classes.paginatorDot}></div>
        </div>
    })
 

    if (isFakeElements) {
        if (currentCard < elements.length / 5) {    
            paginatorDots = [...paginatorDots.slice(0, (elements.length / 5))] 
        } else if (currentCard < (elements.length / 5)*2){
            paginatorDots = [...paginatorDots.slice((elements.length / 5), ((elements.length / 5)*2)) ]
        } else if (currentCard < (elements.length / 5)*3){
            paginatorDots = [...paginatorDots.slice(((elements.length / 5)*2), ((elements.length / 5)*3))]
        } else if (currentCard < (elements.length / 5)*4){
            paginatorDots = [...paginatorDots.slice(((elements.length / 5)*3), ((elements.length / 5)*4))]
        } else if (currentCard < (elements.length / 5)*5){
            paginatorDots = [...paginatorDots.slice(((elements.length / 5)*4), ((elements.length / 5)*5))]
        } 
    }

   
    return (
        <div className={classes.paginator}>
            {paginatorDots}
        </div>
    )
}




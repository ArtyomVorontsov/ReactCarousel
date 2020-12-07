import React, { useEffect, useState } from "react";
import classes from "./Styles/Carousel.module.css"
import { PaginationDots } from "../PaginationDots/PaginationDots.jsx";
import arrow from "./assets/arrow.svg"
import { PhotoCard, UserCard, FullScreenCard } from "./Card/Card.jsx"


export const Carousel = ({ elements = null, Card = null, cardWidth = 480, isInfinite = true, buttonsOn = true, paginatorOn = true }) => {

    const [currentCard, setCurrentCard] = useState(0);
    const [cardPositions, setCardPositions] = useState([]);
    const [carouselCardWidth, setCarouselCardWidth] = useState(cardWidth);
    const [cards, setCards] = useState([]);
    const [isFirstStart, setFirstStart] = useState(true);
    let isFakeElements = false

    if (elements.length < 10 && isInfinite) {
        elements = [...elements, ...elements, ...elements, ...elements, ...elements];
        isFakeElements = true
    }

    const cardsSetup = () => {
        let newCards = elements.map((element, index) => {
            console.log("isMapping")

            switch (Card) {
                case "PhotoCard":
                    return <PhotoCard meta={index} id={index} key={index} picture={element.picture} />

                case "UserCard":
                    return <UserCard meta={index} id={index} key={index} picture={element.picture} />

                case "FullScreenCard":
                    return <FullScreenCard meta={index} id={index} key={index} picture={element.picture} />

                case "FullScreenCardTriple":
                    return <FullScreenCard meta={index} id={index} key={index} picture={element.picture} />

                default:
                    //Add some additional props for custom card
                    return <Card id={index} key={index}  />
            }
        })

        setCards(newCards)
        setFirstStart(false)
    }

    if(isFirstStart){
        cardsSetup()
    }
   

    let startWidthSetup = () => {
        switch (Card) {
            case "UserCard":
                setCarouselCardWidth(480)
                return 480

            case "PhotoCard":
                setCarouselCardWidth(600)
                return 600

            case "FullScreenCard":
                setCarouselCardWidth(window.innerWidth)
                return window.innerWidth

            case "FullScreenCardTriple":
                setCarouselCardWidth(window.innerWidth / 3)
                return window.innerWidth / 3


            default:
                setCarouselCardWidth(cardWidth)
                return 480
        }
    }



    console.log("rerender")


    //Infinite mode next/prev card handlers 

    const setPrevCard = (step) => {

        let newCardPositions = [];

        let j = step - 1;
        for (let i = 0; i < elements.length; i++) {
            if (j >= elements.length - 1) {
                j = -1;
            }
            newCardPositions.push(cardPositions[j += 1]);
        }

        setCardPositions(newCardPositions);


        let noTransitionPositions = []

        let lowestPositions = []
        let arrayWithPositions = [...newCardPositions];
        for (let i = 0; i < step; i++) {
            lowestPositions.push(Math.min(...arrayWithPositions));
            let index = arrayWithPositions.indexOf(lowestPositions[i])
            arrayWithPositions.splice(index, 1);
        }

        noTransitionPositions = [...lowestPositions.reverse()]



        /* Card positions updating and hiding cards 
       which will be moved to head of array.*/
        for (let i = 0; i < elements.length; i++) {
            let card = document.getElementById(i);

            if (noTransitionPositions.includes(newCardPositions[i])) {
                card.style.display = "none"
            } else {
                card.style.transitionProperty = "left"
                card.style.display = "flex"
            }
            card.style.left = `${newCardPositions[i]}px`
        }


        //set display flex to all after spin
        setTimeout(() => {
            for (let i = 0; i < elements.length; i++) {
                let card = document.getElementById(i);
                card.style.display = "flex"
            }
        }, 300)

       
        setCurrentCard(currentCard - step >= 0 ? currentCard - step : (elements.length) + (currentCard - step))
    }


    const setNextCard = (step) => {
        let newCardPositions = [];

        let j = -1
        let secondPart = []
        for (let i = 0; i < elements.length; i++) {
            if (j + step >= elements.length - 1) {
                secondPart.unshift(cardPositions[j += 1])
            } else {
                newCardPositions.push(cardPositions[j += 1])
            }
        }

        //connect two parts of arrays;
        secondPart = secondPart.reverse();
        newCardPositions = [...secondPart, ...newCardPositions];



        setCardPositions(newCardPositions);

        //Determine which card will be hided.
        let noTransitionPositions = []
        let higestPositions = [];
        let arrayWithPositions = [...newCardPositions];

        for (let i = 0; i < step; i++) {
            higestPositions.push(Math.max(...arrayWithPositions));
            let index = arrayWithPositions.indexOf(higestPositions[i])

            arrayWithPositions.splice(index, 1)
        }

        noTransitionPositions = [...higestPositions]

        /* Card positions updating and hiding cards 
        which will be moved to head of array.*/
        for (let i = 0; i < elements.length; i++) {
            let card = document.getElementById(i);
            if (noTransitionPositions.includes(newCardPositions[i])) {
                card.style.display = "none"
            } else {
                card.style.transitionProperty = "left"
                card.style.display = "flex"
            }
            card.style.left = `${newCardPositions[i]}px`
        }


        //Set display flex to all after spin
        setTimeout(() => {
            for (let i = 0; i < elements.length; i++) {
                let card = document.getElementById(i);
                card.style.display = "flex"
            }
        }, 300)


        setCurrentCard(currentCard > elements.length - 1 ? 0 :
            currentCard + step > elements.length - 1 ? (currentCard + step) - elements.length : currentCard + step)
    }


    //Not infinite mode next/prev card handlers 

    let setNextCardNotInfinite = (step) => {
        let startingValue = cardPositions[cardPositions.length - 3]
        let buttonNext = document.getElementById("buttonNext");
        let buttonPrev = document.getElementById("buttonPrev");
        buttonPrev.removeAttribute("disabled", true)
        buttonPrev.style.opacity = "1"



        if (currentCard === cardPositions.length - 2) {
            buttonNext.style.opacity = "0.2"
            buttonNext.setAttribute("disabled", true)
        }

        if (currentCard < cardPositions.length - 1) {
            carousel.style.transform = `translateX(${startingValue - ((currentCard + step) * carouselCardWidth) + (carouselCardWidth / 2)}px)`
            setCurrentCard(currentCard + step)
        }
    }

    let setPrevCardNotInfinite = (step) => {

        let buttonNext = document.getElementById("buttonNext");
        let buttonPrev = document.getElementById("buttonPrev");
        buttonNext.removeAttribute("disabled", true)
        buttonNext.style.opacity = "1"

        let reversedCardPositions = [...cardPositions];
        reversedCardPositions = reversedCardPositions.reverse()

        if (currentCard === 1) {
            buttonPrev.style.opacity = "0.2"
            buttonPrev.setAttribute("disabled", true)
        }
        if (currentCard > 0) {
            carousel.style.transform = `translateX(${reversedCardPositions[currentCard - step + 1] - carouselCardWidth / 2}px)`
            setCurrentCard(currentCard - step)
        }

    }

    let setupNotInfiniteModeCarousel = (cardPositions, cardWidth) => {
        let buttonPrev = document.getElementById("buttonPrev");
        buttonPrev.style.opacity = "0.2"
        let carousel = document.getElementById("carousel");
        carousel.style.transform = `translateX(${cardPositions[cardPositions.length - 1] - (cardWidth + cardWidth / 2)}px)`
        setCurrentCard(0)
    }

    //Get elements positions
    const getPositions = (elements, cardWidth = carouselCardWidth) => {

        let countOfElements = elements.length - 1;
        let carouselWidth = countOfElements * cardWidth;
        let positions = [(-carouselWidth / 2) + (cardWidth / 2)];
        let step = cardWidth;

        for (let i = 0; i < countOfElements; i++) {
            positions.push(positions[positions.length - 1] + step)
        }

        let positionsConvertedToPositive = [];
        positions.forEach((position) => {
            positionsConvertedToPositive.push(Math.abs(position))
        })
        let lowestPosition = Math.min(...positionsConvertedToPositive);
        let firstCarouselPosition = -lowestPosition

        for (let i = 0; i < countOfElements + 1; i++) {
            let card = document.getElementById(i);
            card.style.transitionProperty = "none"

            if (positions[i] === firstCarouselPosition) {
                setCurrentCard(i)
            }
            card.style.left = `${positions[i]}px`
        }
        setCardPositions(positions)

        return positions
    }


    useEffect(() => {
        let cardWidth = startWidthSetup()

        let getPositionsDynamicWidth = () => {
            let processedWidth = 0

            if (Card === "FullScreenCard") {
                processedWidth = getPositions(elements, window.innerWidth)
            } else if (Card === "FullScreenCardTriple") {
                processedWidth = getPositions(elements, window.innerWidth / 3)
            }

            return processedWidth
        }

        if (Card === "FullScreenCard" || Card === "FullScreenCardTriple") {
            window.onresize = getPositionsDynamicWidth
        }


        let cardPositions = getPositions(elements, cardWidth);

        if (!isInfinite) {
            setupNotInfiniteModeCarousel(cardPositions, cardWidth)
        }

    }, [])



    //Handlers

    const keyHandler = (e) => {
        if (e.keyCode === 39) {
            isInfinite ? setNextCard(1) : setNextCardNotInfinite(1)
        }

        if (e.keyCode === 37) {
            isInfinite ? setPrevCard(1) : setPrevCardNotInfinite(1)
        }
    }



    const handleDirection = (clientX) => {

        //handle swipe to left
        if (clientX[0] > clientX[clientX.length - 1]) {
            isInfinite ? setNextCard(1) : setNextCardNotInfinite(1)
        }

        ///handle swipe to right
        if (clientX[0] < clientX[clientX.length - 1]) {
            isInfinite ? setPrevCard(1) : setPrevCardNotInfinite(1)
        }
    }


    /* Array which contains user swipes or
    mouse actions coordinates from X. */
    const clientX = [];


    //Handlers for touch devices.
    const swipeMoveHandler = (e) => {
        clientX.push(Math.floor(e.targetTouches[0].clientX));
    }

    const swipeEndHandler = () => {
        handleDirection(clientX)
    }

    //Handlers for desktop.
    let carousel = document.getElementById("carousel");

    const dragStartHandler = () => {
        carousel.addEventListener("mousemove", dragHandler)
    }

    const dragHandler = (e) => {
        clientX.push(Math.floor(e.clientX));
    }

    const dragEndHandler = () => {
        handleDirection(clientX)
        carousel.removeEventListener("mousemove", dragHandler)
    }


    return (

        <div tabIndex={1} onKeyDown={keyHandler} className={classes.carouselWrapper}>
            <div id={"carousel"}
                onMouseDown={dragStartHandler}
                onMouseUp={dragEndHandler}
                onTouchMove={swipeMoveHandler}
                onTouchEnd={swipeEndHandler}
                className={classes.carouselCards} >
                {cards}
            </div>
            <div className={classes.inputWrapper}>
                {buttonsOn ? <button id={"buttonPrev"} className={classes.buttonPrev} onClick={isInfinite ? () => setPrevCard(1) : () => setPrevCardNotInfinite(1)}><img src={arrow} alt="" /></button> : null}
                {paginatorOn ?
                    <PaginationDots
                        isFakeElements = {isFakeElements}
                        isInfinite={isInfinite}
                        setPrevCard={isInfinite ? setPrevCard : setPrevCardNotInfinite}
                        setNextCard={isInfinite ? setNextCard : setNextCardNotInfinite}
                        elements={elements} currentCard={currentCard} />
                    : null}
                {buttonsOn ? <button id={"buttonNext"} className={classes.buttonNext} onClick={isInfinite ? () => setNextCard(1) : () => setNextCardNotInfinite(1)}><img src={arrow} alt="" /></button> : null}
            </div>
        </div>

    )

}


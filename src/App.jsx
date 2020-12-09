import React from "react";
import ReactDOM from "react-dom"
import classes from "./Styles/App.module.css"
import { Carousel } from "./CarouselBundle/Carousel/Carousel.jsx";
import { elements, elementsRealPhotos } from "./CarouselBundle/FakeAPI/FakeAPI"


const App = (props) => {
    console.log("rerender")
    //PhotoCard 600px
    //UserCard 480px
    //FullScreenCard card window.innerWidth
    //FullScreenCardTriple window.innerWidth

    return (
        <div className={classes.app}>
            <Carousel 
            isInfinite={true}
            paginatorOn={true}
            buttonsOn={true}
            Card={"PhotoCard"}
            elements={elementsRealPhotos}
            
            //cardWidth={window.innerWidth}
            />
        </div>
    )
}


const container = document.getElementById("container");
ReactDOM.render(<App />, container);

# ReactCarousel

<img src="./readmeImages/cardsTypes/FullScreen.jpg">
React Carousel Component

##Description: 
This is a  customisable and responsive  component which bring carousel functionality to your react project. 

React Carousel Component SandBox
To try carousel component you need to have installed nodejs and download code from GitHub repo, then open it with IDE and run in terminal command npm install, npm will install all important packages.
To start project on localhost:8080 you need to type npm start in terminal, to build use npm run build

## Usage:
Carousel have a cards which is entity which will be contain your HTML inside, you can create your own card or use predefined types of cards.
Component supports 4 predefined types of cards:
	1. PhotoCard - Used for images (Width of card: 600px).
	2. UserCard - Used for user information display. (Width of card: 400px).
	3. FullScreenCard - Card which use full height and width of user browser window (Width of card: window.innerWidth).
	4. FullScreenCardTriple  - Card which takes 1/3 of user screen, so you can use it for display three cards at the same time.

## Component properties:

1. isInfinite={true/false}
	Carousel can be infinite of not.

2. paginatorOn={true/false}
You can display or hide paginator.

3. buttonsOn={true/false}
You can display or hide carousel buttons.

4. Card={"PhotoCard" / “UserCard” / “FullScreenCard” / “FullScreenCardTriple”/ <YourCustomCard/>} 
	You can choose type of card or pass your custom card component.

5. elements={ elementsRealPhotos / elements / Your API data }
You can choose API source for carousel, carousel component will map through all API data and render all Cards.

dev properties
6. cardWidth={window.innerWidth}
#### If you build custom card component you should pass your custom card wrapper width to carousel component.

## Work with predefined components:

All predefined cards support picture attribute, so if you want to use pictures in carousel, just create javascript object something like this: 
let PhotosAPI = [{ picture: photo1 }, { picture: photo2 }, { picture: photo3 }] 
And pass it to carousel like this:  <Carousell  Card={“FullScreenCardTitle”} elements={PhotosAPI}  />
Also you can modify card component and add any of HTML content inside.

For this go to ./Carousel/Card/Card.jsx
Choose component which you wan’t to modify, and modify it. 
If you added new attributes to component, you should go inside Caroulsel.jsx and add your new attributes inside card component which was updated.  
	



## Creating custom card component:
	
You can see references in ./Carousel/Card/Card.jsx
Every card component must have a card wrapper div with id attribute like this:

	export const CustomCardComponent = (props) => {
    		return(
        	<div /* Card wrapper */ id={props.id} >
            		<div /* Card */>
			/* Your HTML content */       
            		</div>
        	</div>
	    )
	}


2) After your component was created you can pass it to <Carousell  Card={<YourComponent/>}  />

3) Don’t forget add a cardWidth attribute like this <Carousell cardWidth={500}  Card={<YourComponent/>}  />
(cardWidth attribute should contain your card wrapper width)

4) Then you should add data for your card <Carousell  Card={<YourComponent/>} elements={YourData}  />, reference for data structure you can find in  ./CarouselBundle/FakeAPI/FakeAPI.js
	
5) Next step will be connect your data for component with component itself. You should go inside carousel component and add to Card your props, after that your carousel should work correctly.


## Prohibitions and recommendations:

- Don’t use FullScreenCardTriple with isInfinite={false} only with isInfinite={true}.
- Use images which is compressed with squoosh.app or tinypng.com recommended images extensions is jpg or webp.



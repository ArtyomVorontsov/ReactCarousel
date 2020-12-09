# React Carousel Component


## Description:
This is a customisable and responsive component which supports touch devices and bring carousel functionality to your react project. 

## React Carousel Component SandBox
To try carousel component you need to have installed nodejs and download code from GitHub repo, then open it with IDE and run in terminal command **npm install**, npm will install all important packages.
To start project on localhost:8080 you need to type **npm start** in terminal, to build use **npm run build**.

1. Get code from GitHub repo.
<img width="500" src="./readmeImages/steps/step1.png">

2. Code will be downloaded to your machine.
<img width="500" src="./readmeImages/steps/step2.png">

3. Run **npm install** to get all necessary node pakages.
<img width="500" src="./readmeImages/steps/step3.png">

4. Component sandbox will be in **./ReactCarousel/src/App.jsx**, run **npm start** to try carousel on **localhost:8080**
<img width="500" src="./readmeImages/steps/step4.png">

> Try to change component properties to see all carousel capabilities.

## Type of cards:
Carousel have a cards which is entity which will be contain your HTML inside, you can create your own card or use predefined types of cards.
Component supports 4 predefined types of cards:

- **PhotoCard** - Used for images (Width of card: 600px).
<img width="500" src="./readmeImages/cardsTypes/PhotoCard.jpg">
	
- **UserCard** - Used for user information display. (Width of card: 400px).
<img width="500" src="./readmeImages/cardsTypes/UserCard.jpg">
	
- **FullScreenCard** - Card which use full height and width of user browser window (Width of card: window.innerWidth).
<img width="500" src="./readmeImages/cardsTypes/FullScreen.jpg">
	
- **FullScreenCardTriple**  - Card which takes 1/3 of user screen, so you can use it for display three cards at the same time.
<img width="500" src="./readmeImages/cardsTypes/FullScreenCardTriple.jpg">

## Component attributes:

- isInfinite={true/false}
Carousel can be infinite of not.

- paginatorOn={true/false}
You can display or hide paginator.

- buttonsOn={true/false}
You can display or hide carousel buttons.

- Card={"PhotoCard" / “UserCard” / “FullScreenCard” / “FullScreenCardTriple”/ <YourCustomCard/>} 
You can choose type of card or pass your custom card component.

- elements={ elementsRealPhotos / elements / Your API data }

> {elementsRealPhotos} and {elements} this is arrays from **"./CarouselBundle/FakeAPI/FakeAPI"** they contain demonstration data.

You can choose API source for carousel via elements attribute, carousel component will map through all API data and render all Cards.

**Properties only for custom card component**
- cardWidth={window.innerWidth}
> If you use custom card component you should pass your custom card wrapper width to carousel component.

## Work with predefined components:

All predefined cards support picture attribute, so if you want to use pictures in carousel, just create javascript object something like this: 
```
let PhotosAPI = [{ picture: photo1 }, { picture: photo2 }, { picture: photo3 }] 
```
And pass it to carousel like this: 
```
<Carousell  Card={“FullScreenCardTitle”} elements={PhotosAPI}  />
```

**Also you can modify card component and add any of HTML content inside.**

For this go to: 
```
./Carousel/Card/Card.jsx
```
Choose component which you wan’t to modify, and modify it for example like this:

<img width="500" src="./readmeImages/tutorial/customisedComponent.png">
	
If you added new attributes to component, you should go inside Caroulsel.jsx and add your new attributes inside card component which was updated.  
<img width="500" src="./readmeImages/tutorial/attributesToCard.png">


> For a better understanding of how to modify a predefined card component, I recommend reading this: [Customise predefined card component.](https://github.com/ArtyomVorontsov/ReactCarousel/blob/master/CustomisePredefinedCardComponent.md)


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
	
1) Create your component.

2) After your component was created you can pass it to carousel, like this:
```
<Carousell  Card={CustomCardComponent}  />
```
3) Don’t forget add a cardWidth attribute, like here:
```
<Carousell cardWidth={500}  Card={CustomCardComponent}  />
```
> CardWidth attribute should contain your card wrapper width

4) Then you should add data for your card: 
```
<Carousell cardWidth={500}  Card={CustomCardComponent} elements={YourData}  />
```
Reference for data structure you can find in:  
```
./CarouselBundle/FakeAPI/FakeAPI.js
```
5) Next step will be connect your data for component with component itself. You should go inside carousel component and add to Card your props, for example like here with < PhotoCard /> tag.

<img width="500" src="./readmeImages/tutorial/attributesToCard.png">

After that your carousel should work correctly.



## Carousel support navigation with:
- Buttons
- Paginator
- Mouse swipes
- Touch screen swipes
- Selection carousel with tab and scroll it by left arrow button and right arrow button. (press tab once and push left arrow button or right arrow button)

## Prohibitions and recommendations:

- Don’t use **FullScreenCardTriple** with **isInfinite={false}** only with isInfinite={true}.
- Use images which is compressed with [squoosh.app](https://www.squoosh.app) or [tinypng.com](https://www.tinypng.com) recommended images extensions is jpg or webp.
- Read tutorial about how to [customise predefined card component.](https://github.com/ArtyomVorontsov/ReactCarousel/blob/master/CustomisePredefinedCardComponent.md) 


Create a title in `<App />`: "Laptops"

Start an api call as soon as the page loads, the URL is: https://demoapi.com/api/laptop
After 2 seconds you will receive a response.
Show a loading mask while waiting for the response.
This loading mask should have it's own component - `<LoadingMask />` - containing a div with a single word: "Loading".

Response is going to be an array of laptops:

```ts
[
   { brand: "Apple", name: "MacBook Air", weight: 0.5 },
   { brand: "Asus", name: "P30", weight: 1.7 },
   { brand: "Lenovo", name: "A50", weight: 1.5 }
]
```

Render a `<Laptop />` component for every laptop in the list. A `<Laptop />` component should only show the name of the given laptop.
Implement a button with the text "Show more", which shows the details after clicking, but only for the given laptop (directly under the name, style doesn't matter here).

When details are shown, the button's text should switch to "Show less". After being clicked again, it should hide details and the text should be switched back to "Show more".

Have a header with a button that says: Sort
When clicked it should sort laptops by their weight - from heaviest to lightest - and when clicked again, it should sort them from lightest to heaviest.

In the header create an input field where user can type anything to filter laptops by their name. The list of laptops should update on each character typed.

Use material design's react specific implementation for the project.

### Setup

```ts
// root
import { makeServer } from './api/mockserver'
makeServer({ environment: 'development' })
```

```bash
npm i miragejs
```
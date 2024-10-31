# Restaurant Application

Restaurant Application is built with TypeScript/React. The app allows users to browse, rate and favorite restaurants.

## Installation

1. Clone the repository:
```
https://github.com/Vejn99/RestaurantApplication.git
```

2. Navigate to the starter folder:
```
cd starter
```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm run start
```

5. Run json-server for mock API:
   
```
npm run server
```

## Usage

Once the application is running, you can navigate through various pages to explore different features:

* Landing Page: The first page users see when they visit the site, introducing them to the restaurant application.
* Home Page: Displays all available restaurants using the AllRestaurants component.
* Restaurant Detail Page: Shows detailed information for each restaurant, including a review section. Users can read and leave reviews, which update the restaurant's rating.
* Popular Restaurants Page: Lists the 10 most-reviewed restaurants. Optionally, these can be sorted by rating.
* Surprise Restaurant Page: Links to a random restaurant detail page.
* Cuisines Page: Lists all restaurant types as buttons. Clicking on a button filters restaurants by that cuisine.
* Cuisine Detail Page: Displays all restaurants of a specific cuisine using the RestaurantCard component.
* Favorites Page: Shows all restaurants marked as favorite by the user. Favorites are managed globally and persist on page reloads.

## Browse your application on:
http://localhost:3011/

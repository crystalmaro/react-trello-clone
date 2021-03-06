# React Trello Clone
A replica of a Trello task board, featuring draggable tasks within columns. 

## Functions
1. Users can create a new card in any of the 4 columns by clicking on the "Add Another Card" button, and get the experience of adding a new task
2. Entering text and clicking the "Add Card" button will create a new card within that column, and clicking the "X" will cancel the action
3. The text validation message will pop up if there's no text value when clicking the "Add Card" button
4. Users can drag any card to any column, and reorder tasks within the same column
5. On tablet/mobile or small display, it will allow users to scroll horizontally

## Technical Details
1. Implement using pure CSS
2. Build the experience using React
3. Build it without external drag & drop JavaScript library (i.e. react-beautiful-dnd, react-dnd etc.)

## Image
Desktop View
![image](https://user-images.githubusercontent.com/30251553/154514358-b4b04085-28fb-4bfd-be8e-3d809383b18f.png)

Mobile View (Horizontal Scrolling)
![image](https://user-images.githubusercontent.com/30251553/154514691-3384930d-99a9-4428-820d-8a2e4ef70509.png)

Adding a new task

![image](https://user-images.githubusercontent.com/30251553/154514567-bd6789ae-101f-4d4e-8354-88ba5d120d06.png)

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

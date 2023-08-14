<img width="1920" alt="Screenshot 2023-08-14 at 06 09 01" src="https://github.com/ag533/BadgeVerifier/assets/43811969/5f9618a1-dddd-43b9-aef4-682d482dc08c">
# Setting up the project locally

## Available Scripts

In the project directory, you can run:

### `npm install`

To install all the dependencies

### `npm start`

To build and start the project

### `npm test`

To run all the tests

## Thought process while creating this app

1. First thing that I started to build was a perfect badge to show on the site how a perfect badge will look. Because of this I was able to complete a few function:
   1. Function to check the image format.
   2. Function to check the image size.
   3. Function to resize an image.
   4. Function to convert a simple image to a circular image.
   5. Function to add colourful border to the image. (Not required by this task but was good fun coding it. You can see the previous logs if you would like to have a look at the function.)
2. Now after I has the perfect Logo the next step was to direct users to create a perfect logo.
   1. Upload an image

      i. isImage -> step 2

      ii. isNotAnImage -> re-upload

   2. Check for png

      i. isPng -> step 3

      ii. isNotPng -> Ask if they want to convert the image to png format.
<img width="1920" alt="Screenshot 2023-08-14 at 06 09 37" src="https://github.com/ag533/BadgeVerifier/assets/43811969/d22252d7-9613-4443-9697-af19e7e87f9e">

   3. Check the dimensions

      i. correctDimensions -> step 4

      ii. incorrectDimensions -> Ask if they want to resize the image.
<img width="1920" alt="Screenshot 2023-08-14 at 06 09 47" src="https://github.com/ag533/BadgeVerifier/assets/43811969/130fb6f3-b311-4fe1-85e6-49bda0903605">

   4. Check if circular

      i. isCircular -> step 5

      ii. isNotCircular -> Ask if they want to create a circular image.
<img width="1920" alt="Screenshot 2023-08-14 at 06 22 45" src="https://github.com/ag533/BadgeVerifier/assets/43811969/948638a7-324c-403e-a6ea-b60bfcbb88cc">

   5. Check if happy colors

      i. happyColors -> Download or Upload
<img width="1920" alt="Screenshot 2023-08-14 at 06 10 45" src="https://github.com/ag533/BadgeVerifier/assets/43811969/de825a13-e311-46c8-9535-7f9bbb4af8d5">
<img width="1920" alt="Screenshot 2023-08-14 at 06 10 20" src="https://github.com/ag533/BadgeVerifier/assets/43811969/b9d789f0-7426-44e4-ade4-fcc768679131">
<img width="1101" alt="Screenshot 2023-08-14 at 06 10 37" src="https://github.com/ag533/BadgeVerifier/assets/43811969/3d2f776b-e18f-43a4-a738-c901c69fa65b">

      ii. notHappyColors -> upload new image

## Testing infrastructure

I have added few jest tests to show how testing can be done for this project. I total around 50 unit tests can be created for this project and 32 end to end tests.

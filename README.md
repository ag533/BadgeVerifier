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

   3. Check the dimensions

      i. correctDimensions -> step 4

      ii. incorrectDimensions -> Ask if they want to resize the image.

   4. Check if circular

      i. isCircular -> step 5

      ii. isNotCircular -> Ask if they want to create a circular image.

   5. Check if happy colors

      i. happyColors -> Download or Upload

      ii. notHappyColors -> upload new image

## Testing infrastructure

I have added few jest tests to show how testing can be done for this project. I total around 50 unit tests can be created for this project and 32 end to end tests.

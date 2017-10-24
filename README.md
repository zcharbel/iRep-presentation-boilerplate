# iRep-presentation-boilerplate
This is a base template for an iRep presentation that has a true global folder and grunt task to package all slides into .zips for upload to salesforce.com.

Things that are done when the script is run are:

- CSS and JS are minified
- Images are optimized
- Moving the "_global" folder from a global position to a local position within each slide
- All slides in the production folder are compressed into a .zip for upload to salesforce

### How do I get set up? ###

To get up and running, follow the steps below.

- navigate to your project's root directory within terminal
- run "npm install" to install all dependicies
- update and/or add slide names to the "multidest" grunt command within "Gruntfile.js" (begins on line 77)
    If this step is not done, the "_global" folder and contents will not be copied into each slide.
- run "grunt"

Once done, all you need to do is upload the output .zips to salesforce.

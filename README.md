# Next steps

~~- Remind users through push notifications.~~
~~- Setup firebase~~
~~- Setup a way so that you dont have to run this command again & again(something like hot reloading)node_modules/.bin/webpack --entry ./script.js -o dist~~
~~- Add login/signup funcationality(for water drink functionliaty)~~
    - Fix login/signup shows on realod
    - Figure out a way to import/export firebase in a single file, so you don't have to write it again & again
~~- Add water drank in a day functionality(through firebase)~~
~~- Remaining water functionliaty~~
~~- Foloow this tutoril to create a new project: https://www.plasmo.com/blog/posts/firebase-chrome-extension~~
~~- Complete HTML page for Signup & login with validations~~
- Implement auth state changed functinality i.e. whenever a user refreshes or stays on a page for long time
  he should be still logged in.
  https://stackoverflow.com/questions/55801494/persist-auth-state-firebase-chrome-extension
~~- Show the amount of water emaining on initl load~~
- Logout functionlatiy
- Refactor the code
- Remove the unecessary file
- Test this extension in other people laptops (gaurang, aditya, sister) or distribute in the community
- Try to use sass/scss with this project
- Hide access key
~~- Implement dashboard page~~
- Make a auth state checker(interceptor)
- Secure firebase rules(authenticate REST request with that)
- Setup a functionality to filter water drank in a particular day i.e. filter by day(otherwiser it will show 0 till infinity)
- If by default the users dont choose a default time for reminder, then the notification should not show.
- Update fonts
  - Lato
  - bebas neue
  - Roboto
  - Montserrat
https://firebase.google.com/docs/reference/rest/database#section-param-auth

Ref:

So how much fluid does the average, healthy adult living in a temperate climate need? The U.S. National Academies of Sciences, Engineering, and Medicine determined that an adequate daily fluid intake is:

About 15.5 cups (3.7 liters) of fluids a day for men
About 11.5 cups (2.7 liters) of fluids a day for women

3.7litres = 3700ml
https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256#:~:text=About%2015.5%20cups%20(3.7%20liters,fluids%20a%20day%20for%20women



The measurement of a glass of water in milliliters varies between 200 ml and 250 ml.
https://blog.monouso-direct.com/how-many-ml-has-a-glass/#:~:text=The%20measurement%20of%20a%20glass,200%20ml%20and%20250%20ml


# How to run this project

Simple run serve from the root directory of the folder i.e. /water-reminder

https://stackoverflow.com/questions/55801494/persist-auth-state-firebase-chrome-extension
# Next steps

- Refactor and clean the code
  - Reuse the firebase code for better readability
    - Move all the firebase function to background.js
      - ~~Settings Page~~
      - ~~History Page~~
      - ~~Dashboard Page~~
      - ~~Signup/Login Page~~
  - Introduce the use of .env variables for security reasons
  - Reuse the logo image i.e. glass-of-water.svg
  - Use ternary instead of if else
  - Show only last 5 entries instead of all the entries in history page
  - Create a util function for filterEntriesForToday as it is been used in multiple places
- Implement Alarms based on the notification value of the user.
- Imtrodue a website to show detailed statistics and charge for the same

# References

So how much fluid does the average, healthy adult living in a temperate climate need? The U.S. National Academies of Sciences, Engineering, and Medicine determined that an adequate daily fluid intake is:

About 15.5 cups (3.7 liters) of fluids a day for men
About 11.5 cups (2.7 liters) of fluids a day for women

3.7litres = 3700ml
<https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256#:~:text=About%2015.5%20cups%20(3.7%20liters,fluids%20a%20day%20for%20women>

The measurement of a glass of water in milliliters varies between 200 ml and 250 ml.
<https://blog.monouso-direct.com/how-many-ml-has-a-glass/#:~:text=The%20measurement%20of%20a%20glass,200%20ml%20and%20250%20ml>

# Important Links

<https://stackoverflow.com/questions/59914490/how-to-handle-unchecked-runtime-lasterror-the-message-port-closed-before-a-res>

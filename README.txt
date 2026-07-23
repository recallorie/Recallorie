TODO - 1.23

x- Add the exact portion (in grams) to the foodEojis.js file as a 4th column and prepopulate the grams after the
    lookup completes but before the user presses the "Log this meal" button
x- Since all icons in place, treat first icon as 1st step but long pressing on the icon will bring up an additional
    popup screen with more details for a lookup choice. I want the second popup to be to display a table with
    the 1st selected icon at the top of a list with up to the top 7 choices (which should also be another variable to
    customize later) of more descriptions that should be used for search.  An example of this is if I long press
    on milk, a 2nd popup will show a selectable list of "Whole", "2%", "1%", "Skim", "Chocolate".  In this case
    if I select "Skim", both popups close and the lookup entry will search on "Milk, Skim". Once this choice is
    made, the 2nd popup is closed, then the 1st popup is closed and the selection from the 2nd popup is
    automatically looked up.  NOTE, The secondary text for each of the first food icons will be stored in an
    array of strings in the foodEmijis.js file on the same entries that the particular food icon is stored.  For
    now, the array of these strings to display in the secondary menu should be prepopulated with:
            { "Desc1", "Desc2", "Desc3", "Desc4", "Desc5", "Desc6", "Desc7" }
    I will hand edit all of these upon looking at the database as to what makes sense for each food icon.
x- For the secondary drop down, I can have a max of 7 entries right now.  What if I only have 2 entries and not 7? Can
        you get rid of any lines in the second drop down if the line is empty or missing?
x- There is a bug that IDK how to fiz: Right now for Grapes, if I select a "cup" of Grapes, I want it to
    display 152g (grams) but instead it calculates something much larger.  1 cup of grapes should equal 152 grams.
x- Need to incorporate a calendar into the screen so user could press a left arrow and go back a day. Pressing again
    the same left arrow would keep moving back 1 day for each press.  All food entries from the
    particular day would be shown below in chronological order for that day.
x- Under the calendar/Daily tally, I want you to keep the format of all the "Eaten Today" entries hidden and only
        show if the user presses a triangle next to the "Eaten Today" text.  When this is pressed, reverse the
        triangle (like a dropdown box does) and display a window with all the entries for today that fit on the
        screen.  If it fills the screen, then add a vertical bar to the right so the user can move this up and down
        and see all foods eaten.
- Hide the 2 download buttons (Export and History) behind a profile icon.  This profile icon should be in the top
    right corner of the screen.
- Come up with a way for the user to save a whole meal and reuse it with a click of an icon.  I think this would
    mean that we would need another icon group next to all the food group icons in the main window.  It should
    only be shown if this user made a meal. All meals are really multiple entries that contain the individual food
    entries for this meal.  I think this managing of the meals should be stored under the profile button.  There could
    be a small menu of different things to select like the export and "History" button that should be moved under here
    anyway.

TODO for 260723:
- Allow for individual "Eaten Today" food items to be edited. ex: I want to change the rice portion from 1 cup to 200g.
- Modify the duplicate button under "Quick Recall" to
- Change the version internally in the Recallorie.html so I can see in the browser debugger when a new version is
    read from the website and not just cached. Start incrementing this with every new Recallorie.html code generation
    starting with version 1.29 and then incrementing by .01 for each new version.
- I want to be able to add bread to last Friday's breakfast, so will need to be able to add a new entry to a past day.
- Center the popups so that they look like they are not getting cut off.  They way they are now without the rounded
    edges at the bottom makes the user think that there is more that they need to scroll down but there is nothing else.
- Add in logging for weight and BP (and maybe a user defined "something" that they wish to track.
- For all individual food items in the "Eaten Today" and "Quick Recall" dropdowns, I want these food listings to be
    the same. ie, Right now they display "48 Cal" in "Eaten Today" and "48 Cal/100g" in the "Quick Recall."  I also want
    to see these records contain the Protein, Carbs, and Fat. An example is Corn. Inside its record, it should
    read: at "Prot:3g,Carb:27g,Fat:17g" in the bottom right in small text (the same size as it has for the time and
    food source). I think the user may want to see which food item may have caused his total carb intake to be high.
- I want to use the Balance Scale Unicode Character ⚖️ (U+2696) in the headers of "Eaten Today" and "Quick Recall"
    dropdowns.

FUTURE:
- Log weight.
- Log BP.
- Log exercise.
- I need to move the user (profile) onto a system where I can have multiple users.
- I want to use the Balance Scale Unicode Character ⚖️ (U+2696) as my favicon.ico
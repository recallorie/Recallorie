TODO - 1.27

x- Add the exact portion (in grams) to the foodEojis.js file as a 4th couln and prepopulate the grams after the
    lookup completes but before the user presses the "Log this meal" button
x- Add more icons similar to Zelda
x- Add the exact portion (in grams) to the foodEojis.js file as a 4th couln and prepopulate the grams after the
    lookup completes but before the user presses the "Log this meal" button
x- Since all icons in place, treat first icon as 1st step but long pressing on the icon will bring up an additional
    popup screen with more details for a lookup choice. I want the second popup to be to display a table with
    the 1st selected icon at the top of a list with up to the top 7 choices (which should also be another variable to
    customize later)  of more descriptions that should be used for search.  An example of this is if I long press
    on milk, a 2nd popup will show a selectable list of "Whole", "2%", "1%", "Skim", "Chocolate".  In this case
    if I select "Skim", both popups close and the lookup entry will search on "Milk, Skim". Once this choice is
    made, the 2nd popup is closed then the 1st popup is closed and the selection from the 2nd popup is
    automatically looked up.  NOTE, The secondary text for each of the first food icons will be stored in an
    array of strings in the foodEmijis.js file on the same entries that the particular food icon is stored.  For
    now, the array of these strings to display in the seconary menu should be prepopulated with:
            { "Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4",
              "Descriptor #5", "Descriptor #6", "Descriptor #7" }
    I will hand edit all of these upon looking at the database as to what makes sense for each food icon.
x- Need to incorporate a calendar into the screen so user could press a left arrow and go back a day. Pressing again
    the same left arrow would keep moving back 1 day for each press.  Obviously, all food entries from the
    particular day would be shown below in chronological order for that day.
- Come up with a way for the user to save a whole meal and reuse it with a click of an icon
-

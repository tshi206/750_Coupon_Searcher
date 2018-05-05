#Browser Extension: Coupon Search Chrome Extension

The project is about creating a Google Chrome Extension application that provide shortcut to find coupons for items so users can have pleasant experience with their online shopping. 

The current version only works on Amazon.com and coupons provided by Amazon.com.

##Installation
1. Create a folder and name it whatever users want.
2. Download all files into the folder.
3. Open Google Chrome Browser and open the Extension Management page by navigating to chrome://extensions.
   * The Extension Management page can also be opened by clicking on the Chrome menu on top right corner shaped like 3 dots aligned vertically, hovering over More Tools then selecting Extensions.

4. Enable Developer Mode by clicking toggle button/switch next to Developer Mode.  

5. Click the Load Unpacked button and select the folder where users saved the extension. 
6. users are ready to run the extension!!

##How to Use
Prerequisite for running the extension: Enter/Open Amazon.com

There is 3 ways to search the item users want.
1. Open the Popup menu by clicking the Coupons icon (extension icon) which appear on the top right hand corner of the browser after installation. Enter the item that users want to search in the textbox.
Then press "Search" button to view the result which will open in new window. 
2. If "Popup on Select" option is turned on, the extension automatically do the search on selected word(s) by highlighting or double clicking. New wiondow will open to show the result.
3. If "Popup on Select" option is off, highlight word or words. Then right click the highlighted words which will include option to search based on the highlighted word(s).

Another feature that can be used is "History". 

After each search, the result is saved into local storage. The old search can be accessed when the popup window is re-opened after the search occur. 

The 5 most recent searches are shown in the list and can be opened by clicking on them. 

If users right click the extension icon or right click the browser, users can access options page where some setting can be adjusted.


The history list on the popup window can be turned off by clicking "history off" button. User can also clear the history by clicking "Clear History" button. Clear history requires confirmation from user to clear history. 

The user can also turn off Popup window on select by turning the button off. 
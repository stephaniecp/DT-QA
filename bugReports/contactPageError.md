# Contact Us page: reCAPTCHA error

## Description:
When a user navigates to the Contact Us form, a reCAPTCHA error is visible (but truncated on all browser sizes tested). The error reads: "ERROR for site owner: Invalid domain for key site".

## Expected result:
No error occur on the Contact Us form, but if an error did happen for any reason, a clear error message would inform the user about what is wrong. 
## Actual result:
An error message occurs upon loading the page. It is truncated and not very clear to the user. Should this be an internal error? 

Note that I did not test submiting the form since this was not offical QA work, but it could be worth testing to see if the form submission is affected.  

## Steps to reproduce:
1. Navigate to https://northamerica.daimlertruck.com/contact-us/
2. Notice the error in the lower right of the screen

## Browsers: 
Chrome, Safari & Firefox
## Device: 
MacBook Pro 2018 with MacOS 13.2.1
& MacBook Pro 2015 with MacOS 12.6.3

![Screenshot of the error](/bugReports/contactPageError.jpg)
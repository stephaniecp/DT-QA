# DT-QA | Daimler Truck QA Project
This project is a serie of automated tests for the Daimler Truck website.

## About The Tests
All of the tests can be viewed in the [test file](https://github.com/stephaniecp/DT-QA/blob/main/mainTest.test.ts). Each test require at least one custom method, which were created in my [Page Object](https://github.com/stephaniecp/DT-QA/blob/main/mainPageObject.ts). Multiple of those methods involved some more genral (not specific to this project) methods. Those can be found in the [Base Page](https://github.com/stephaniecp/DT-QA/blob/main/basePage.ts). 
1. Test 1.0, 1.1. and 1.2: <br />
Those are more general tests before to valide before going into more targeted tests. I like to start with this kind of tests to prove that my test project is working as expected and reveal anything that I might have missed since it is easier to troubleshoot
2. Test 2.0: <br />
This test makes sure that the core part of the search function works. It verifies that the user/driver is able to initiate a search and that the results are relevant. This last part is done by looking for keyword matches between the search query and the search results. 
3. Test 3.0: <br />
This tests verify that the user/driver is able to enter text in the text fields in the contact form. Because the site is real and activly used, it does however not submit the form. Note that while testing this section, I came across a bug. See Bug section below for the detail. 


## Bug(s)
While testing, I came across a bug on the Contact Us form. [Click here](bugReportscontactPageError.md) for the complete bug report. 

<br />
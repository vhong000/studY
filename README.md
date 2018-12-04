## StudY [![Build Status](https://travis-ci.com/CSC59939/studY.svg?branch=master)](https://travis-ci.com/CSC59939/studY)
---
### Welcome to StudY!
The purpose of this project is to bring New York City college students together and help them organize study groups to share  information, knowledge, and expertise about a subject in which they have particular interest. 
We offer a web application that will assist students to create study groups to learn the subject in a deeper, more meaningful way.
***
### Our Inspiration
StydY is inspired by the software engineering project proposal of Rohan Swaby:
> StudY is a service that provide students with a platform to create study groups that meets on a specific college campus. This platform will only focus on colleges in New York City. It’s similar to meetup app but for college students who wants to start a study group for a specific subject.    
-- _Rohan Swaby, CCNY student_
***

### Roles

| Name                  | Release 1                         |  Release 2            |
| -------------         |:---------------------------------:|:---------------------:|
| Victor Hong           | Unit Tester & Presenter           | Presenter & Unit Tester|
| Hanna Nekhniadovich   | Documenter                        | Documenter            |
| Rohan Swaby           | Customer                          | Code reviewer & Tracker|
| Moustafa Abdou        | Continuous Integration/Delivery   | CI/CD                 |
| Carlos Ng Sang        | Code Reviewer                     | Customer & Designer   |


----

### Continuous Integration
- We use Travis CI to run tests and for automated deployment
- PRs and push events to feature branches trigger 2 sequential builds
   - Django/API tests (Python 3.6 runtime)
   - UI tests (Node.js runtime)
- After passing all checks and approval from at least 1 reviewer, PRs are merged into master followed by deployment to heroku


### Deployment setup (Heroku)
- gunicorn WSGI server
- WhiteNoise to serve static assets
- heroku-postgres db backend

---

### API Docs
[https://documenter.getpostman.com/view/3106741/RWguwGu4](https://documenter.getpostman.com/view/3106741/RWguwGu4)


### Site
[https://studyy-app.herokuapp.com/](https://studyy-app.herokuapp.com/)




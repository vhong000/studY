## Welcome to StudY!
The purpose of this project is to bring New York City college students together and help them organize study groups to share  information, knowledge, and expertise about a subject in which they have particular interest. 
We offer a web application that will assist students to create study groups to learn the subject in a deeper, more meaningful way.
***
## Our Inspiration
StydY is inspired by the software engineering project proposal of Rohan Swaby:
> StudY is a service that provide students with a platform to create study groups that meets on a specific college campus. This platform will only focus on colleges in New York City. It’s similar to meetup app but for college students who wants to start a study group for a specific subject.    
-- _Rohan Swaby, CCNY student_
***
## Meet the Team
### Iteration I
### frontend
* Victor Hong - Unit Tester,  Presenter
* Hanna Nekhniadovich - Documenter
* Rohan Swaby - Customer
### backend
* Moustafa Abdou - Continuous Integration/Delivery
* Carlos Ng Sang - Code Reviewer
### API Docs
[https://documenter.getpostman.com/view/3106741/RWguwGu4](https://documenter.getpostman.com/view/3106741/RWguwGu4)
### Continuous Integration
We use a self-hosted CI/CD solution (Jenkins) with a multibranch pipeline that has the following hooks:
- push events to feature branches 
- PRs: test + build against master
- post-merge checks + deployment/release

##### pipeline stats: [http://52.207.169.97:8080/blue/organizations/jenkins/studY/activity](http://52.207.169.97:8080/blue/organizations/jenkins/studY/activity)

----
##### deployment setup
- Nginx
- uWSGI

##### host: [http://52.207.169.97:8000](http://52.207.169.97:8000)









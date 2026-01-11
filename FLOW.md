# Application Flow

This diagram represents the navigation structure of the Raj Mind Health Services website.

```mermaid
graph TD
    Home["Home (index.html)"] --> About["About Us"]
    Home --> Services["Services"]
    Home --> Testimonial["Testimonial (testimonial.html)"]
    Home --> Gallery["Gallery (gallery.html)"]
    Home --> Contact["Contact Us (contactus.html)"]

    subgraph About Us
        About --> Trustees["Board of Trustees (boardoftrustees.html)"]
        About --> Advisors["Advisory Board (boardofadvisors.html)"]
        About --> Technical["Technical Support Team (technicalteam.html)"]
        About --> WhoWeAre["Who We Are (whoweare.html)"]
        About --> WhatWeDo["What We Do (whatwedo.html)"]
    end

    subgraph Services
        Services --> Counselling["One to One Counselling (counselling.html)"]
        Services --> SpecialEd["Special Education (specialeducation.html)"]
        Services --> Career["Career Guidance (careerguidance.html)"]
        Services --> Training["Training (training.html)"]
        Services --> Assessment["Assessment (assessment.html)"]
        Services --> Other["Other Services (otherservices.html)"]
    end
```

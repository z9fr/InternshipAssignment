# Explaining what is design pattern and how we can use design patterns in projects

A design pattern is a general solution for a common problem in software design. its not a finished design that can be transformed directly in to code.
its more like a description/ template about how to solve the problem.

Design pattern can help us to make the development process faster by providing us with tested/ proven development paradigms.


# What is DTO and explain the use of it.

A Data Transfer Object (DTO for short) is an object that is used to encapsulate data, and sent it from one subsystem of an application to another. 

- DTO's commonly used by Services layer in N-Tier applications, ( To transfer data between itself and UI layer )
- DTO's can also be used to encapsulate parameters for method calls. which can be useful if a method takes more than for or five parameters

when using the DTO pattern, we also make use of the DTO assemblers, The assemblers are used for create DTOs from Domain Objects, and vice versa.


# How are you going to store secrets in an application without exposing it to the internet?

Most common approach I use whenever I want to use secrets in my applications without exposing internet is by using environment variables. in the 
situations like running a CI pipeline I would usually store my environment variables / secrets in a secret storage like aws secret manager or 
github secrets.

# What is JWT and how does it work?

JSON Web Tokens is a self-contained way for securely transmitting information between parties as a JSON object. The information can be verified and trusted 
because it is digitally signed. 

- write more 

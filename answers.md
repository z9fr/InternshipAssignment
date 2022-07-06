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
because it is digitally signed. JWT tokens are particularly useful when comes to API authentication and server-to-server authorization. 

JWT token has 3 parts, separated by dots(.), and base64 encoded. if we decode the jwt token we gets
- The header and the payload.
- The signature.

The header contains the type of token — JWT in this case — and the signing algorithm.  
The payload contains the claims, display as a json string
The signature ensures that the token hasn’t been altered.


# What is the difference between SQL and NoSQL databases?

| SQL                                                     | NOSQL                                     |
|---------------------------------------------------------|-------------------------------------------|
| Relational Database                                     | Non-relational or Distributed databases   |
| Table based                                             | document based                            |
| vertically scalable                                     | horizontally scalable                     |
| has a predefined schema                                 | use dynamic schema for unstructured data. |
| requires specialized DB hardware for better performance | uses commodity hardware.                  |


# Suggest a good state management for frontend application and explain why you recommend it.

A state is a representation of a system in a given time. State refers to the data stored in Application in the form of a string, array, object, etc.

### Fetching data  ( Communication state )

if we take a react application as a example and if im Suggesting a state management. my usual go to would be react query in a case of rest API,
but if the backend users graphql I would recommand apollo. In a case where there's a application that needs like a custom setup I would recommand
redux but just for a avarage react app the above would be my suggested libs

### Local state

local state is pretty much any client side state that just one component or few near by comoponent needs access to, like a check box to show 
some information. For this type of stuff I would usually use build in use State hook. if things get more complex we can also use the useReducer hook

### Global state

in a situation like this i like to use react context or pretty much any state management libs



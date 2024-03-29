    |Project overview|:
Develop a secure, transparent, and anonymous online voting system utilizing blockchain technology to ensure the integrity of votes suitable for elections and surveys.

    |Problem to solve | For what it might be used|:
Voting is an essential part of democratic processes, it lies down beyond just the major elections for positions like the president or prime minister. 
In today's digital era when all people go online and stay online constantly, the boundry between our online and offline lives increasingly blurs, it's important to give people a chance not to only entertain themselvse there but also to do the most importants things such as making a choise. The necessity to give people a secure, transparent and anonynous online system where they can make their choise and vote is undeniable. 
This system might be used by students in educational institutions, by professionals in labor unions, members of cooperatives, in online communities, clubs and other non-profit organisations to vote on leadership positions and key initiatives or projects.



Architecture components:

    |Frontend|
0. Technologies: TypeScript, React for the development of interactive UIs, React-Redux for state management, and Apollo Client for GraphQL integration.
1. Voter interface: allows voters to do authentication, view ballots, do voting, and check results.
2. Admin interface: enables administrators to create elections, manage ballots, and publish results.
3. Real-Time results viewing: making subscriptions in GraphQL to provide live updates of election result (to be decided how to implement as on Thu Mar 28).

    |Backend|
0. Technologies: Node.js with Express for RESTful APIs and a GraphQL server for efficient data fetching.
1. GraphQL API gateway: managing queries and mutations related to voting operations and real-time data.
2. Express.js server: handling authentication, user registration and other operations not covered by GraphQL.
3. Authentication service: managing user sessions and authentication, possibly would be using JWT (as on Thu Mar 28).
4. Database connection: interface to interact with the relational/NoSQL database for non-blockchain persistent storage (still to be decided how to implement as on Thu Mar 28).

    |Blockchain|
1. Smart Contracts (Voting Logic): that is for voting logic, including vote casting, tallying and anonymity mechanisms.
2. Nodes (Blockchain Network): choose a blockchain that supports smart contracts and meets the project's requirements (to be decided how to implement as on Thu Mar 28).

    |Database|
1. User and Election Data: relational or NoSQL database for storing user profiles, election configurations, and non-blockchain transaction logs (probably woould use mongoDB as on Thu Mar 28).
2. File storage: for static assets.


    |External Integrations|
1. Notification services(microservises): manages sending emails or SMS for voter registration confirmation, reminders and election results.


    |Security|
1. Encryption Services: SSL/TLS for secure data transmission, plus additional encryption for sensitive data at rest.
1. Secure authentication: implement secure login mechanism, usin JWT for token-based authentication.

    |Deployment and monitoring|
0. Technologies: docker for containerization, cloud service for deployment (probably would use Fly.io).
1. CI/CD Pipeline: GitHub actions for automated testing and deployment.

Final thoughts as on Thu Mar 28:
Not an easy one, kind of ambicious project. the most challenging definitely would be blockchain, as I know it very briefly, from the guides and free courses from the web, didn't get my hands dirty with it just yet. The same applies for Pipeline, took a short course on it, but that shouldn't be too difficult. The rest looks more less ok and familliar.
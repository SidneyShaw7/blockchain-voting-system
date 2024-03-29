Blockchain Voting System Frontend
Welcome to the frontend of the Blockchain Voting System

The main fetures to provide:

|Register interface|:
Be able to sign up as a voter or an administrator with a secure registration process.

|LogIn LogOut interface|:
Access the system with secure authentication, and log out when your session is complete.

|Voter interface|:
Participate in active voting events, view past votes, and manage your voting account.

|Admin interface|:
Create and manage voting events, view voter participation, and publish results.


Project structure:

The frontend project is organized into main components, each dedicated to a specific function within the application:

SignUpModal/: Handles user registration, allowing new users to sign up as either a voter or an administrator.
LogInOutModal/: Manages user sessions, including login and logout functionalities.
VoterModal/: Provides the interface for voters to participate in elections, view upcoming and past elections, and manage their profiles.
AdminModal/: Enables administrators to create and manage voting events, monitor voter participation, and publish voting results.
Each component is self-contained with its own TypeScript (or TSX), and optional testing files.

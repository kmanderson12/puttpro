## dueonrepeat

Track recurring income and expenses. Gain greater visibility into your budget.

**View Project: [dueonrepeat.now.sh](https://dueonrepeat.now.sh)**

### Tech Stack
- React & Next.js
- styled components
- React Context and Hooks for State Management
- Apollo Client (Coming Soon)
- GraphQL (Coming Soon)
- Hasura (Coming Soon)
- auth0 (Coming Soon)
- React Testing Library (Coming Soon)
- Vercel

### Roadmap
- Basic Budget UI (In-Progress: 90%)
- Connect to Hasura for database and user management
- Create Timeline View
- Create Calendar View

### Thoughts and Inspiration

#### UI Design
The design of the UI is heavily inspired by the excellent work of Tailwind UI (Steve Schoger and Adam Wathan). Though I'm not actually using their CSS library, their color pallette and design tips have been extremely helpful. Because of their inspiration, I was able to draw something up in Figma rather quickly that (I believe) looks not-too-shabby.

#### Tech Decisions
Currently, my stack of choice is Next.js with a Hasura backend. I love what Zeit is doing with Next--SSR, API Routes, Dynamic Routing. And Hasura is such a great tool that makes getting a SQL database with GraphQL schema up and running quickly.

For global state management, I decided to use React's context and reducers to give a Redux-like approach without the overhead of Redux. Since I'll be creating multiple views, I decided to separate the majority of the state into context to give easy acess to other components without the need for prop-drilling.

#### Motivation
When drawing up my own family's budget, I often find it a challenge to visualize where and when my money is going to be spent over the next month. In a world where so much of our income is spent through recurring subscriptions and auto-drafts, it can be challenging to keep up with the consistent due-date for each expense.
As I thought through this problem, I came up with my own method of keeping track of this--but it was only with pen and paper. Being a developer who's always searching for the next problem to solve, I dove into Figma to visualize the possibilities and then jumped into Next.js to start making it happen.
After I get the core functionality nailed down, my ultimate goal is to have multiple views that will give clarity and insight into a personal budget.

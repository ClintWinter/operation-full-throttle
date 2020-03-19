# Domain-centric Architecture

A classic three-layer database-centric architecture has UI, business logic, and data access layers revolving around the database.

Now some are putting the domain at the center instead of the database. The database becomes an implementation detail outside of the architecture.

> *"The first concern of the architect is to make sure that the house is usable, it is not to ensure that the house is made of brick."*
>
> -Uncle Bob

This becomes about what is *essential* vs what is just an implementation detail or ornamentation. The domain is essential. Use cases are essential. But presentation is a detail. Persistence is a detail too.

An example is the onion architecture. No inner layer knows about the outer layers. They all point inward to the domain model.

Another is the clean architecture by Uncle Bob. Once again a layered architecture with "Entities" (the domain) at the center.

The hexagonal is another example, but at the end of the day, all three are accomplishing the same thing. They put the domain at the center, wrap it in an application layer that embeds the use cases, adapts the application to the implementation details and all dependencies point inwards to the domain.
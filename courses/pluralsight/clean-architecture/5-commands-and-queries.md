# Commands and Queries

Will cover:
* How to keep commands and queries separated in an architecture.
* Three types of CQRS architectures.
* Pros and cons of CQRS practices.

## Command-Query separation

Two types of methods in object-oriented software:
* Command - does something
    * Should modify the state of the system, but should not return a value
* Query - answers a question
    * Should not modify the state of the system, should return a value

Should try to maintain command/query separation where possible.

This is not always possible. For example, popping off of a stack removes the item (command) and returns the popped item (query).

Or when creating a new database record, you may create the record (command) and also need to return the new ID (query).

## CQRS Architectures

![Imgur](https://i.imgur.com/OxED7ra.png)

Command-Query Responsibility Separation (CQRS) Architectures expand the command-query separation concept to the architectural level.

The architecture is divided to a command stack and a query stack starting at the application layer. The main reason is because queries should be optimized for reading data while commands should be optimized for writing data.

There are three main types of CQRS.

### Single-database CQRS

Has a single database that is some kind of 3rd normal form (3NF) or NoSQL database.

Commands execute behavior in the domain, which modifies state and is saved in the database. The persistence layer is usually an ORM.

Queries are executed directly against the database using a thin data-access layer, which is usually an ORM using projections linked to SQL, SQL scrips, or stored procedures.

Simplest of the three.

### Two-database CQRS

![Imgur](https://i.imgur.com/RIjFdmr.png)

Has a read database and a write database.

The command stack has its own write database optimized for write operations (e.g., 3NF or NoSQL database).

The query stack has a database optimized for read operations (e.g., 1NF or some other de-normalized read-optimized data store)

The write database changes are pushed into the read database either as single transactions or by using an eventual consistency pattern.

### Event Sourcing CQRS

![Imgur](https://i.imgur.com/07SOZgM.png)

We don't store the current state of our entities in a normalized data store. Instead we store the state modifications to the entities over time represented as events that have occured to the entities.

We store this historical record of all events in a persistence medium called an *event store*. When we need to use an entity in its current state, we replay all of the events that have occured to that entity and end up with the current state of the entity. Once we've reconstructed the current state, we execute domain logic and modify the state of the entities accordingly. This new event will be stored in our event store so it can be replayed as needed. Push the current entity state to the read database so our read queries will still be fast.

This is the most complex, but it has some serious benefits:
* The event store is an audit trail for the entire system.
* We can reconstruct the state of an entire entity at any point in time.
* We can replay events to observe what happened in the system.
* We can project the current state of our entities into more than one read-optimized data store.
* We can rebuild our production database just by playing the events.

These can be very beneficial when needed, but if these features are not necessary they can be very expensive for no substantial gain.

## Why Use CQRS?

Pros:
* If using domain-driven design (DDD), CQRS is a more efficient design from a coding perspective.
    * Commands are coded to use the rich domain models to modify state.
    * Queries are coded directly against the database to read data.
* We are optimizing the performance of both the query side and the command side.
* By using event sourcing we gain all of the benefits mentioned above.

Cons:
* There's an intentional inconsistency in the command vs query stack.
* More complex when using more than one database.
* Event sourcing entails higher cost in maintaining event sourcing features. It may not pay for itself in the long run.
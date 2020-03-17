# Application Layer

## What are layers?

Vertical partitions of an application designed to
* represent different levels of abstraction
* maintain single-responsibility principle
* isolate developer roles and skills
* help support multiple implementations
* assist with varying rates of change

## Three-layer architecture

The classic three-layer architecture has
* a UI layer
* a business logic layer
* and a data access layer

![Imgur](https://i.imgur.com/F01gXww.png)

This architecture is very useful for simple CRUD applications. However, it doesn't work all that well with complex domain models. There's a lot of ambiguity about where application-level abstractions vs domain-level abstractions should go.

## Four-layer architecture

This has led to a more modern four-layer domain-centric architecture.

![Imgur](https://i.imgur.com/alvyBoV.png)

First, we have our presentation layer, which provides the user an interface into the application.

Second, we have an application layer, which imbeds the use cases of the application as executable code and abstractions.

Third, we have a domain layer, which contains only the domain logic of the application.

Fourth, we have the infrastructure layer, often it makes sense to divide this layer into one or more projects ("projects" is language-specific to when creating .NET applications).

Persistence provides the application an interface to the database or other persistent storage.

Infrastructure provides the application an interface to the operating system and other 3rd party components.

Cross-cutting concerns, which are aspects of the application that cross all of the layers of the system.

## Application layer

Implements use cases as executable code. For example, we may have a custom that searches for a product, adds it to their cart, and pays with a credit card.

We structure this executable use case code as high-level representations of application logic.

We might have a query that searches for a product for our customer, or a command that adds a product to their shopping cart.

The application knows about the domain layer--it has a dependency on the domain. It does not depend on any of the other layers.

We utilize the dependency inversion principle. **_Abstraction should not depend on details, but rather details should depend on abstractions_**.

In the persistence and infrastructure layers our dependencies oppose the flow of control in our application.

![Imgur](https://i.imgur.com/66gpu6n.png)

This provides the benefits of
* independent deployability, we can replace an implementation in production without affecting the abstraction it depends upon
* flexibility and maintainability, we can swap out our persistence or infrastructure mediums without having negative side-effects ripple through the application.

Notice the dashed arrow from persistence to domain, this is because the ORM may need to know about the entities within the domain layer to map them to tables in the database.

![Imgur](https://i.imgur.com/StiPr2u.png)

Here is a visual example of how these classes and interfaces are wired together in a demo application.

As you can see, everything depends on *interfaces* rather than concrete classes. All gray boxes with "I\*" are interfaces. For example, `CreateSaleCommand` depends on the `IDatabaseService` interface rather than a concrete database class, so the database class can be replaced as long as it adheres to the interface.

## Why use an application layer

Pros:
* we are placing focus on use cases, which are essential to the primary inhabitants of the architecture.
* we embed the use cases as high-level executable code, which delegates low-level steps to other classes. This makes the code very easy to understand.
* It follows the dependency inversion principle (DIP), allowing us to delay implementation decisions until further into the project.

Cons:
* An additional cost to creating and maintaining this layer.
* We have to spend extra time thinking about what belongs in the application layer vs the domain layer rather than a single business logic layer.
* The inversion of control between the application and infrastructure layer is often counter-intuitive for novice developers.
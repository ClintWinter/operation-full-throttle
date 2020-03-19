# Functional Organization

Overview
* Screaming architecture practice
* Functional vs. categorical cohesion
* Pros and Cons of functional organization

## Screaming Architecture

> *"The architecture should scream the intent of the system!"*
>
> -Uncle Bob

We scream the intent of our system by organizating our architecture around the use cases of the system. Use cases are a representation of our users interaction with the system (e.g., getting a list of all customers, purchasing a product, paying a vendor).

![Imgur](https://i.imgur.com/HparOaM.png)

Looking at the blueprint we can determine the use cases of the structure. Sleeping in a bedroom, eating in a dining room, etc.

![Imgur](https://i.imgur.com/fxZ3A4P.png)

It's much more difficult to determine the *intent* of this architecture just by looking at it's list of components.

We can do the same with our software architecture. We can organize our architecture based on the components used to build that software, such as models, views, and controllers. Or we can organize it based on the use cases of the system, such as customers, products, and vendors.

Let's look at two representations of the same software architecture.

Typical MVC folder structure:
```
Content/
Controllers/
Models/
Scripts/
Views/
```

Organized by high level use cases:
```
Customers/
Employees/
Products/
Sales/
Vendors/
```

Generally, functional cohesion (organizing by use cases) is more efficient than categorical cohesion (organizing by component types).

An analogy would be storing dinner forks with our pitch forks and tuning forks because they are all forks (categorical cohesion) versus storing our dinner forks, knives, and spoons together because they are all used when eating (functional cohesion).

It also makes more sense to keep files that are used together near each other in the structure.

## Why use functional organization?

Pros:
* We utilize spatial locality, items that are used together live together.
* Easier to navigate the folder structure.
* Helps avoid vendor and framework lock-in. We aren't forced into the folder structure the vendor insists we use to implement their framework.

Cons:
* We lose the ability to use the default conventions of our frameworks, so we have to tell the framework where things are located.
* We lose the automatic scaffolding features. They are usually designed to create auto-generated template files by categorical cohesion.
* Categorical cohesion is easier at first, but tends to be more difficult over the life of the project.
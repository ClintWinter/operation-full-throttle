# Microservices

Overview
* Bounded context - how to subdivide a large domain model
* Microservices - how to subdivide a monolithic architecture
* Pros and cons

![Imgur](https://i.imgur.com/HkpjUDM.png)

How we would typically subdivide an architecture once it has grown beyond a manageable size.

Let's say we are building an application to perform sales and support tasks. Our problem domain contains the following nouns:

| Sales | Support |
| --- | --- |
| Sales opportunity | Support Ticket |
| Contact | Customer |
| Sales person | Support person |
| Product | Product |
| Sales Territory | Resolution |

## Overlapping Contexts
In the old days we would create a single unified domain model by merging the nouns that point to the same concept. For example, a product is a product on both the sales and support side, so it ends up modeled as a single "product" entity. Contact and Customer get merged as a Customer and would have a bunch of nullable fields when used as a Contact. The Sales Person and Support Person are both employees and so get merged as such. However, as we model larger and larger domains, it becomes progressively harder to keep this as a single domain model.

## Bounded Contexts

The recognition of a specific contextual scope within which a specific model is valid.

This leads us into microservices. Microservices divide monolithic applications into smaller subsystems.

These microservices communicate with each other using clearly-defined interfaces.

They allow smaller teams to work on each microservice.

Microservices are independent of each other. This allows each team to focus on a single domain of knowledge. They don't need to know the intimate details of any other team's domain, database, or microservices. They just need to know how to communicate with those well-defined interfaces provided by those interfaces.

How small should a microservice be? Where to divide them? It really just depends on what is needed.

## Pros and cons

Pros:
* Flatter cost curve--it has a higher initial cost but grows much slower as it gets bigger
* Creates systems with high cohesion and low coupling
* Offers independence--can use whatever technology, patterns, and practices you want

Cons:
* Higher up-front cost
* Conway's Law - Organizations which design systems are constrained to produce systems that mirror the communication structures of their organization
* Distributed system costs
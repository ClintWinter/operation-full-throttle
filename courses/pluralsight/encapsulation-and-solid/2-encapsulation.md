# Encapsulation

## Reusable components

> Do you build applications on top of reusable components?

? Do you build your applications on top of web frameworks, ORM, error handling library, caching system, dependency injection container, or anything you didn't build yourself?

You should, you can stand on the shoulders of giants and use components that other people have already built.

> Do you regularly look at the **source code** of those components? Do you spend a regular amount of your daily work time looking at those components?

You are able to work with those components without learning all of the nitty-gritty implementation details.

That's what ecapsulation is about: writing code that is reusable without having to understand everything about how it works.

## Most code sucks

Write code for stupid programmers.

An example of code that sucks:

``` C#
public class FileStore
{
    public string WorkingDirectory{ get; set; }

    public string Save(int id, string message);

    public event EventHandler<MessageEventArgs> MessageRead;

    public void Read(int id);
}
```

What does this code actually do? What do the members do?

For example, why does `Save` return a string? What does the string contain? If there's no documentation, most look at the source code:

``` C#
public string Save(int id, string message)
{
    var path = Path.Combine(this.WorkingDirectory, id + ".txt");
    File.WriteAllText(path, message);
    return path;
}
```

May seem like not a big deal, but if we imagine this method called other methods and did more, it would eat up a lot of time having to do this on a regular basis.

What about the `Read` method? Why does it return `void`?

We can maybe guess that the `MessageRead` event is associated with the `Read` method and we can get the message from the event handler.

``` C#
public void Read(int id)
{
    var path = Path.combine(this.WorkingDirectory, id + ".txt");
    var msg = File.ReadAllText(path);
    this.MessageRead(this, new MessageEventArgs { Message = msg });
}
```

Once again, we have to read the source code to understand how this works.

This is a problem.

## Why do we care?

Most of the time it isn't enough to tell a manager the codebase is "hard to work with". All you're gonna here is, "We don't have time for this--go make more features."

So really the question is "why should anyone else in the company care that you don't like working with the sucky code?"

Sucky code has a negative impact on *long-term productivity*. It becomes more and more difficult to add new features when a few developers fill the codebase with spaghetti, which can happen in only a few weeks.

*Maintainability* also suffers. Continuing to work with that spaghetti code is a nightmare.

One of the reasons is **code is _read_ way more often than it is _written_**.

We have a responsibility to write code that is readable and understandable for our colleagues and our future self. Nobody will likely have the understanding we have while we are building that feature.

## Classic OO definition

Has two traits:
* Information hiding (implementation hiding)
* Protection of invariants

Protection of invariants involves making sure invalid states are impossible on classes. This can be done sometimes by checking pre and post conditions (assertions).

## Beyond OO

We can reach beyond OO for some actionable steps.

### Command Query Separation

Your operations should be commands or queries, but not both.

Also known as CQS, which is not CQRS. CQRS is an architectural design pattern.

Commands - have observable side-effects

Queries - returns data

CQS is a principle because it is very possible to not follow it, but even though you can do it, you shouldn't.

### Postel's Law